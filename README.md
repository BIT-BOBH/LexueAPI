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

