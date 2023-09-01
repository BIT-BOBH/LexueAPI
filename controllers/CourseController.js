const apiconfig = require('../ApiConfig');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { universalGetRequest, universalServiceCall } = require('../utils/Request');

const getEnrolledCourse = async(sessKey, moodlesession, offset = 0, limit = 0) => {
  return await universalServiceCall(sessKey, moodlesession, "core_course_get_enrolled_courses_by_timeline_classification", {
    "offset": offset,
    "limit": limit,
    "classification": "all",
    "sort": "fullname",
    "customfieldname": "",
    "customfieldvalue": ""
  });
}

const getCourseDetailHtml = async(moodlesession, courseId) => {
  return await universalGetRequest(`${apiconfig.API_VIEWCOURSE}?id=${courseId}`, moodlesession);
}

const GetAllCourse = async(req,res,next) => {
  const retJson = await getEnrolledCourse(req.sessKey, req.moodlesession);
  if(typeof(retJson) != 'object') {
    res.json({
      error: true,
      msg: 'API return error info.',
      detail: JSON.stringify(retJson)
    });
  } else {
    res.json({
      error: false,
      msg: '',
      detail: retJson[0]
    });
  }
}

const GetCourseContent = async(req,res,next) => {
  const id = req.params.id;
  if(id == undefined) {
    res.json({
      error: true,
      msg: 'Invalid course id!'
    });
    return;
  }
  const html = await getCourseDetailHtml(req.moodlesession, id);
  const $ = cheerio.load(html);
  const sections = [];
  const courseName = $('.page-header-headings').find('h1').text().trim();
  if(courseName == "") {
    res.json({
      error: true,
      msg: 'Course not found!'
    });
    return;
  }
  const topics = $('li');
  topics.each((index, section) => {
    const classValue = $(section).attr('class');
    if(!classValue) return;
    if(!classValue.includes('section')) return;
    const curSection = {};
    const contentElem = $(section).find('.content');
    const titleElem = $(contentElem).find('h3');
    const titleAElem = $(titleElem).find('a');
    curSection.name = titleElem.text().trim();
    // 获取小节的链接
    if(titleAElem.length > 0) {
      curSection.url = titleAElem.attr('href');
    }
    // 获取summary
    curSection.summary = $(contentElem).find('.summary').html();
    if(curSection.summary != null) {
      curSection.summary = curSection.summary.trim();
    }
    // 获取summaryText
    curSection.summaryText = $(contentElem).find('.summarytext').html();
    if(curSection.summaryText != null) {
      curSection.summaryText = curSection.summaryText.trim();
    }
    // 获取 activities
    curSection.activity = [];
    const activitiesElem = $(contentElem).find('li.activity');
    activitiesElem.each((index, activity) => {
      const curActivity = {};
      const activityAElem = $(activity).find('a');
      const instanceNameElem = $(activity).find('.instancename');
      const contentWithoutLinkElem = $(activity).find('.contentwithoutlink');
      const contentAfterLinkElem = $(activity).find('.contentafterlink');
      if(activityAElem.length > 0) {
        curActivity.url = $(activityAElem).attr('href');
      }
      if(instanceNameElem.length > 0) {
        curActivity.access = $(instanceNameElem).children('.accesshide').text().trim();
        curActivity.name = $(instanceNameElem).children('.accesshide').remove().end().text().trim();
      }
      if(contentWithoutLinkElem.length > 0) {
        curActivity.contentwithoutlink = $(contentWithoutLinkElem).html().trim();
      }
      if(contentAfterLinkElem.length > 0) {
        curActivity.contentafterlink = $(contentAfterLinkElem).html().trim();
      }
      curSection.activity.push(curActivity);
    })
    sections.push(curSection);
  });
  res.json({
    courseName,
    sections,
  });
}

const GetCourseMembers = async(req,res,next) => {

}

module.exports = {
  GetAllCourse,
  GetCourseContent,

};