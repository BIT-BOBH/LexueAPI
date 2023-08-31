const apiconfig = require('../ApiConfig');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { universalGetRequest } = require('../utils/Request');

const getEnrolledCourse = (sessKey, moodlesession, offset = 0, limit = 0) => {
  return new Promise ((resolve, reject) => {
    let data = JSON.stringify([
      {
        "index": 0,
        "methodname": "core_course_get_enrolled_courses_by_timeline_classification",
        "args": {
          "offset": offset,
          "limit": limit,
          "classification": "all",
          "sort": "fullname",
          "customfieldname": "",
          "customfieldvalue": ""
        }
      }
    ]);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${apiconfig.API_AJAXSERVICE}&sesskey=${sessKey}`,
      headers: { 
        'Host': 'lexue.bit.edu.cn', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0', 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
        'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2', 
        'Accept-Encoding': 'gzip, deflate, br', 
        'Connection': 'keep-alive', 
        'Referer': 'https://lexue.bit.edu.cn/', 
        'Cookie': `MoodleSession=${moodlesession};`, 
        'Upgrade-Insecure-Requests': '1'
      },
      maxRedirects: 0,
      data: data,
      validateStatus: (status)=>{
        return true;
      }
    };
    axios.request(config).then((response) => {
      if(response.headers.location == undefined && response.status == 200) {
        resolve(response.data);
      } else {
        resolve("");
      }
    })
    .catch((error) => {
      resolve("");
    });
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
  const topics = $('li');
  topics.each((index, section) => {
    const classValue = $(section).attr('class');
    if(!classValue) return;
    if(!classValue.includes('section')) return;
    const curSection = {};
    const contentElem = $(section).find('.content');
    curSection.name = $(contentElem).find('h3').text().trim();

    sections.push(curSection);
  });
  res.json({
    courseName,
    sections,
  });
}

module.exports = {
  GetAllCourse,
  GetCourseContent,

};