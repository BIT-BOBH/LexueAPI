const API_USERINFO = 'https://lexue.bit.edu.cn/';
const API_DETAILUSERINFO = 'https://lexue.bit.edu.cn/user/edit.php';
const API_GETENROLLEDCOURSE = 'https://lexue.bit.edu.cn/lib/ajax/service.php?info=core_course_get_enrolled_courses_by_timeline_classification';
const API_USERPROFILE = 'https://lexue.bit.edu.cn/user/profile.php';
const API_USERPOSTS = 'https://lexue.bit.edu.cn/mod/forum/user.php';

module.exports = {
  // 用户基本信息
  API_USERINFO,
  // 用户自身详细信息
  API_DETAILUSERINFO,
  // 用户所有加入的课程
  API_GETENROLLEDCOURSE,
  // 其他用户的基本信息
  API_USERPROFILE,
  // 用户发送的帖子
  API_USERPOSTS,

};