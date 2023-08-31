# LexueAPI

北京理工大学第三方乐学api实现

# 已实现接口

以下接口，如非特别说明，均需要请求头带有“moodlesession=xxxxx”，其中的xxxxx替换成lexue的cookie中对应项

## 1. 获取自己所有课程信息

| 方法 | GET             |
| ---- | --------------- |
| 链接 | /api/course/all |

返回示例：

```json
{
    "error": false,
    "msg": "",
    "detail": {
        "error": false,
        "data": {
            "courses": [
              {
              		"id": 11201,
              		"fullname": "《数据结构与C++程序设计》---C++程序设计姚分喜",
              		"shortname": "数据结构与C++程序设计",
              		"idnumber": "",
              		"summary": "{summary}",
              		"summaryformat": 1,
              		"startdate": 1659974400,
              		"enddate": 1669053600,
              		"visible": true,
              		"showactivitydates": false,
              		"showcompletionconditions": true,
              		"fullnamedisplay": "《数据结构与C++程序设计》---C++程序设计姚分喜",
              		"viewurl": "https://lexue.bit.edu.cn/course/view.php?id=11201",
              		"courseimage": "{base64 image}",
              		"progress": 66,
              		"hasprogress": true,
              		"isfavourite": false,
              		"hidden": false,
              		"showshortname": false,
              		"coursecategory": "自动化学院"
             }
           ],
           "nextoffset": 30
        }
    }
}
```

## 2. 获取自己的用户信息

| 方法 | GET            |
| ---- | -------------- |
| 链接 | /api/user/info |

返回示例：

```json
{
    "userId": "我的乐学id",
    "fullName": "我的名字",
    "firstAccessTime": "第一次登录时间文本",
    "onlineUsers": "xx 位在线用户 (3分钟内)",
    "detailInfo": {
        "email": "我设定的lexue邮箱",
        "stuId": "我的学号",
        "phone": "我设定的手机号"
    }
}
```

## 3. 获取其他同学的用户信息

| 方法 | GET                |
| ---- | ------------------ |
| 链接 | /api/user/info/:id |

| 参数 | 描述         |
| ---- | ------------ |
| :id  | 同学的用户id |

返回示例：

```json
{
    "fullName": "同学的名字",
    "email": "同学绑定的邮箱",
    "courseInfo": [
        {
            "name": "2023-小学期硬件类实验",
            "link": "https://lexue.bit.edu.cn/user/view.php?id=92390&course=13750&showallcourses=1"
        },
        {
            "name": "高性能科学计算 复制 1",
            "link": "https://lexue.bit.edu.cn/user/view.php?id=92390&course=13591&showallcourses=1"
        }
    ]
}
```

```json
{
    "error": true,
    "msg": "User Not Found!"
}
```

## 4. 获取用户发表的所有帖子

| 方法 | GET                 |
| ---- | ------------------- |
| 链接 | /api/user/posts/:id |

| 参数 | 描述                       |
| ---- | -------------------------- |
| :id  | 同学的用户id(可以是自己的) |

返回示例：

```json
{
    "postsInfo": [
        {
            "title": "回复: 为什么scanf后面的gets不能输入？",
            "postUrl": "https://lexue.bit.edu.cn/mod/forum/discuss.php?d=178591#p900871",
            "time": "2021-11-17T00:32:02+08:00",
            "timestamp": 1637080322000
        },
        {
            "title": "回复: 为什么在for循环里面输出ASCII码为127的字符会导致死循环？",
            "postUrl": "https://lexue.bit.edu.cn/mod/forum/discuss.php?d=174885#p890588",
            "time": "2021-10-21T12:11:35+08:00",
            "timestamp": 1634789495000
        }
    ]
}
```

## 5. 获取自己站内消息

| 方法 | GET               |
| ---- | ----------------- |
| 链接 | /api/user/message |

返回示例：

```json
{
    "error": false,
    "msg": "",
    "detail": {
        "error": false,
        "data": {
            "notifications": [
                {
                    "id": 12549104,
                    "useridfrom": -10,
                    "useridto": 105306,
                    "subject": "您已经提交了作业第5章作业 截止时间11月28日零点",
                    "shortenedsubject": "您已经提交了作业第5章作业 截止时间11月28日零点",
                    "text": "<p>您已经提交了作业第5章作业 截止时间11月28日零点</p>",
                    "fullmessage": "数电2021级徐特立-未来精工 -> 作业 -> 第5章作业 截止时间11月28日零点\n---------------------------------------------------------------------\n您已经提交了作业“第5章作业 截止时间11月28日零点”。\n\n您可以查看作业状态：https://lexue.bit.edu.cn/mod/assign/view.php?id=390220\n\n---------------------------------------------------------------------\n",
                    "fullmessageformat": 2,
                    "fullmessagehtml": "xxxx",
                    "smallmessage": "您已经提交了作业第5章作业 截止时间11月28日零点",
                    "contexturl": "https://lexue.bit.edu.cn/mod/assign/view.php?id=390220",
                    "contexturlname": "第5章作业 截止时间11月28日零点",
                    "timecreated": 1693447341,
                    "timecreatedpretty": "9 分钟 30 秒以前",
                    "timeread": 1693447525,
                    "read": true,
                    "deleted": false,
                    "iconurl": "https://lexue.bit.edu.cn/theme/image.php/eguru/mod_assign/1688655529/icon",
                    "component": "mod_assign",
                    "eventtype": "assign_notification",
                    "customdata": "{\"cmid\":\"390220\",\"instance\":\"48152\",\"messagetype\":\"submissionreceipt\",\"blindmarking\":false,\"uniqueidforuser\":\"5119252\",\"courseid\":\"12248\"}"
                }
            ],
            "unreadcount": 0
        }
    }
}
```

## 6. 获取用户的最近事件

| 方法 | GET                                                          |
| ---- | ------------------------------------------------------------ |
| 链接 | /api/event/all?timesortto=:timesortto&timesortfrom=:timesortfrom |

| 参数          | 描述                   |
| ------------- | ---------------------- |
| :timesortto   | 过滤的事件结束的时间戳 |
| :timesortfrom | 过滤的事件开始的时间戳 |

返回示例：

```json
{
    "error": false,
    "msg": "",
    "detail": {
        "error": false,
        "data": {
            "events": [
                {
                    "id": 3805465,
                    "name": "2016年诺贝尔奖的分子机器在讲啥？ should be completed",
                    "description": "<div class=\"no-overflow\"><div title=\"Page 1\"><div><div><div><p>1983年，让-皮埃尔·索瓦日（<span style=\"color:rgb(239,69,64);\">J-P Sauvage</span>）将2个环形分子连接在一起形成链，并将其命名为索烃。 2个互锁的环可以彼此相对移动，这是第一个分子机器的雏形。</p><p>1991年，詹姆斯·弗雷泽·斯托·达特（<span style=\"color:rgb(239,69,64);\">J Fraser Stoddart</span>）制备了一种轮烷，并展示了分子轴上的分子环能够沿着轴移动。基于轮烷，他设计研发了分 子电梯和分子肌肉等分子机器。</p><p>1999年，伯纳德·费林加（<span style=\"color:rgb(239,69,64);\">B Feringa</span>）成为第一个开发分子马达的人，并且根 据它设计制造出分子汽车。</p><p>基于上述3位科学家在分子机器研究领域的杰出贡献，他们分享了<span style=\"font-size:0.9375rem;\">2016年诺贝尔化学奖 。（详情见文献）</span></p></div></div></div></div></div>",
                    "descriptionformat": 1,
                    "location": "",
                    "categoryid": null,
                    "groupid": null,
                    "userid": 78771,
                    "repeatid": null,
                    "eventcount": null,
                    "component": "mod_resource",
                    "modulename": "resource",
                    "instance": 284029,
                    "eventtype": "expectcompletionon",
                    "timestart": 1630426440,
                    "timeduration": 0,
                    "timesort": 1630426440,
                    "timeusermidnight": 1630425600,
                    "visible": 1,
                    "timemodified": 1626244261,
                    "icon": {
                        "key": "icon",
                        "component": "resource",
                        "alttext": "活动事件"
                    },
                    "course": {
                        "id": 8278,
                        "fullname": "21-22-1生命科学基础A",
                        "shortname": "生命科学基础A-1",
                        "idnumber": "",
                        "summary": "<p>本课程为一年级新生必修课。</p>",
                        "summaryformat": 1,
                        "startdate": 1626192000,
                        "enddate": 1644459060,
                        "visible": true,
                        "showactivitydates": false,
                        "showcompletionconditions": true,
                        "fullnamedisplay": "21-22-1生命科学基础A",
                        "viewurl": "https://lexue.bit.edu.cn/course/view.php?id=8278",
                        "courseimage": "course image",
                        "progress": 16,
                        "hasprogress": true,
                        "isfavourite": false,
                        "hidden": false,
                        "showshortname": false,
                        "coursecategory": "生命学院"
                    },
                    "subscription": {
                        "displayeventsource": false
                    },
                    "canedit": false,
                    "candelete": false,
                    "deleteurl": "https://lexue.bit.edu.cn/calendar/delete.php?id=3805465&course=8278",
                    "editurl": "https://lexue.bit.edu.cn/course/mod.php?update=284029&return=1&sesskey=i0F72T6fng",
                    "viewurl": "https://lexue.bit.edu.cn/calendar/view.php?view=day&course=8278&time=1630426440#event_3805465",
                    "formattedtime": "<span class=\"dimmed_text\"><a class=\"dimmed\" href=\"https://lexue.bit.edu.cn/calendar/view.php?view=day&amp;time=1630426440\">09月1日 星期三</a>, 00:14</span>",
                    "isactionevent": true,
                    "iscourseevent": false,
                    "iscategoryevent": false,
                    "groupname": null,
                    "normalisedeventtype": "course",
                    "normalisedeventtypetext": "课程事件",
                    "action": {
                        "name": "查看",
                        "url": "https://lexue.bit.edu.cn/mod/resource/view.php?id=284029",
                        "itemcount": 1,
                        "actionable": true,
                        "showitemcount": false
                    },
                    "url": "https://lexue.bit.edu.cn/mod/resource/view.php?id=284029"
                }
            ],
            "firstid": 3805465,
            "lastid": 3805465
        }
    }
}
```

