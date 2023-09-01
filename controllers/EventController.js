const cheerio = require('cheerio');
const apiconfig = require('../ApiConfig');
const axios = require('axios').default;
const { universalGetRequest, universalServiceCall } = require('../utils/Request');

const getCalendarEvent = async(sessKey, moodlesession, timesortto, timesortfrom) => {
  return await universalServiceCall(sessKey, moodlesession, "core_calendar_get_action_events_by_timesort", {
    "limitnum": 10,
    "timesortfrom": timesortfrom,
    "timesortto": timesortto,
    "limittononsuspendedevents": true
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