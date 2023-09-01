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

```
参见 "./example/user_event.json"
```

## 7. 获取课程目录内容

| 方法 | GET                     |
| ---- | ----------------------- |
| 链接 | /api/course/content/:id |

| 参数 | 描述     |
| ---- | -------- |
| :id  | 课程的id |

返回示例：

```
参见 "./example/course_content.json"
```

```json
{
    "error": true,
    "msg": "Course not found!"
}
```

## 8. 获取课程参与者名单

| 方法 | GET                     |
| ---- | ----------------------- |
| 链接 | /api/course/members/:id |

| 参数 | 描述     |
| ---- | -------- |
| :id  | 课程的id |

返回示例：

```
参见 "./example/course_members.json"
```

```json
{
    "error": true,
    "msg": "Request failed!",
    "detail": {
        "error": true,
        "exception": {
            "message": "在数据库表course中找不到数据记录。",
            "errorcode": "invalidrecord",
            "link": "https://lexue.bit.edu.cn/",
            "moreinfourl": "http://docs.moodle.org/311/en/error/moodle/invalidrecord"
        }
    }
}
```

