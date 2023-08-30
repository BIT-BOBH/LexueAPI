const cheerio = require('cheerio');
const apiconfig = require('../ApiConfig');
const axios = require('axios').default;

const universalGetRequest = (url, moodlesession) => {
  return new Promise ((resolve, reject) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url,
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
      validateStatus: (status)=>{
        return true;
      }
    };
    axios.request(config).then((response) => {
      if(response.headers.location == undefined && response.status == 200) {
        resolve(response.data.toString());
      } else {
        resolve("");
      }
    })
    .catch((error) => {
      resolve("");
    });
  });
}

const getDetailUserInfoHtml = async(userId, moodlesession) => {
  return await universalGetRequest(`${apiconfig.API_DETAILUSERINFO}?id=${userId}`, moodlesession);
}

const getUserProfileHtml = async(userId, moodlesession) => {
  return await universalGetRequest(`${apiconfig.API_USERPROFILE}?showallcourses=1&id=${userId}`, moodlesession);
}

const getUserPostsHtml = async(userId, moodlesession) => {
  return await universalGetRequest(`${apiconfig.API_USERPOSTS}?id=${userId}&perpage=99999`, moodlesession);
}

const GetSelfInfo = async(req,res,next) => {
  const $ = cheerio.load(req.indexHtml);
  const fullName = $('.myprofileitem.fullname').text().trim();
  const firstAccessTime = $($('.myprofileitem.firstaccess').contents()[2]).text().trim();
  const onlineUsers = $('#instance-33495-header').parent().find('.info').text().trim();
  const userId = $('#nav-notification-popover-container').attr('data-userid');
  const detailHtml = await getDetailUserInfoHtml(userId, req.moodlesession);
  const detailInfo = {};
  if(detailHtml != "") {
    const $$ = cheerio.load(detailHtml);
    detailInfo.email = $$('#id_email').attr('value').trim();
    detailInfo.stuId = $$('#id_idnumber').attr('value').trim();
    detailInfo.phone = $$('#id_phone1').attr('value').trim();
  }
  res.json({
    userId,
    fullName,
    firstAccessTime,
    onlineUsers,
    detailInfo
  });
}

const GetUserInfo = async(req,res,next) => {
  const id = req.params.id;
  if(id == undefined) {
    res.json({
      error: true,
      msg: 'Invalid user id!'
    });
    return;
  }
  const html = await getUserProfileHtml(id, req.moodlesession);
  const $ = cheerio.load(html);
  const fullName = $('.page-header-headings').text().trim();
  const email = $('.profile_tree').find('section').first().find('dd').first().find('a').text().trim();
  const courseInfo = [];
  const liElements = $('.profile_tree').find('section').eq(1).find('li');
  liElements.each((index, liElement) => {
    if($(liElement).attr('class') == 'contentnode') return;
    const aElement = $(liElement).find('a');
    const name = aElement.text().trim();
    const link = aElement.attr('href');
    courseInfo.push({ name, link });
  });
  if(fullName == "") {
    res.json({
      error: true,
      msg: 'User Not Found!',
    });
    return;
  }
  res.json({
    fullName,
    email,
    courseInfo
  });
}

const GetUserPosts = async(req,res,next) => {
  const id = req.params.id;
  if(id == undefined) {
    res.json({
      error: true,
      msg: 'Invalid user id!'
    });
    return;
  }
  const html = await getUserPostsHtml(id, req.moodlesession);
  const $ = cheerio.load(html);
  const postsInfo = [];
  const articles = $('.user-content').find('article');
  articles.each((index, article) => {
    const titleElem = $(article).find('h3').first().find('a').last();
    const title = titleElem.text().trim();
    const postUrl = titleElem.attr('href');
    const time = $(article).find('time').attr('datetime');
    const timestamp = Date.parse(time);
    postsInfo.push({
      title,
      postUrl,
      time,
      timestamp,
    });
  });
  res.json({
    postsInfo
  });
}

module.exports = {
  GetSelfInfo,
  GetUserInfo,
  GetUserPosts,

};