const cheerio = require('cheerio');
const apiconfig = require('../ApiConfig');
const axios = require('axios').default;

const getCalendarEvent = (sessKey, moodlesession, timesortto, timesortfrom) => {
  return new Promise ((resolve, reject) => {
    let data = JSON.stringify([
      {
        "index": 0,
        "methodname": "core_calendar_get_action_events_by_timesort",
        "args": {
          "limitnum": 10,
          "timesortfrom": timesortfrom,
          "timesortto": timesortto,
          "limittononsuspendedevents": true
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

const GetSelfEvent = async(req,res,next) => {
  const timesortto = req.query.timesortto;
  const timesortfrom = req.query.timesortfrom;
  if(timesortto == undefined) {
    res.json({
      error: true,
      msg: 'Invalid param timesortto!'
    });
    return;
  }
  if(timesortfrom == undefined) {
    res.json({
      error: true,
      msg: 'Invalid param timesortfrom!'
    });
    return;
  }
  const retJson = await getCalendarEvent(req.sessKey, req.moodlesession, timesortto, timesortfrom);
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

module.exports = {
  GetSelfEvent,

};