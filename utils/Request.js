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

module.exports = {
  universalGetRequest,
  
};