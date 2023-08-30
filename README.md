# LexueAPI

北京理工大学第三方乐学api实现

# 已实现接口

以下接口，如非特别说明，均需要请求头带有“moodlesession=xxxxx”，其中的xxxxx替换成lexue的cookie中对应项

## 获取自己所有课程信息

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
             },
           ],
           "nextoffset": 30
        }
    }
}
```

