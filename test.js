const axios = require('axios').default;
const apiconfig = require('./ApiConfig');

async function ValidateMoodleSession(moodlesession) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: apiconfig.API_USERINFO,
    headers: { 
      'Host': 'lexue.bit.edu.cn', 
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0', 
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
      'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2', 
      'Accept-Encoding': 'gzip, deflate, br', 
      'Connection': 'keep-alive', 
      'Referer': 'https://lexue.bit.edu.cn/', 
      'Cookie': 'MoodleSession=varmenoua1cv0652134q79iuv;', 
      'Upgrade-Insecure-Requests': '1'
    },
    maxRedirects: 0,
    validateStatus: (status)=>{
      return true;
    }
  };
  axios.request(config).then((response) => {
    console.log(response.headers);
    Promise.resolve(true);
  })
  .catch((error) => {
    console.log(error);
    Promise.resolve(false);
  });

}

ValidateMoodleSession(123);