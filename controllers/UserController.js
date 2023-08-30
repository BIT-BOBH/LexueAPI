const cheerio = require('cheerio');


const GetUserInfo = async(req,res,next) => {
  const $ = cheerio.load(req.indexHtml);
  const fullName = $('.myprofileitem.fullname').text().trim();
  const firstAccessTime = $($('.myprofileitem.firstaccess').contents()[2]).text().trim();
  const onlineUsers = $('#instance-33495-header').parent().find('.info').text().trim();
  res.json({
    fullName,
    firstAccessTime,
    onlineUsers
  });
}

module.exports = {
  GetUserInfo,

};