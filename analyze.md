# 分析

## 主页信息

`https://lexue.bit.edu.cn/my/`

请求cookie：MoodleSession=varxxxxx

返回信息：html，包含用户名，sesskey

## 获取所有课程信息

`https://lexue.bit.edu.cn/lib/ajax/service.php?sesskey={sesskey}&info=core_course_get_enrolled_courses_by_timeline_classification`

请求cookie：MoodleSession=varxxxxx

请求body：json

```json
[
    {
        "index": 0,
        "methodname": "core_course_get_enrolled_courses_by_timeline_classification",
        "args": {
            "offset": 0,   // 起点数
            "limit": 0,   // 返回课程数
            "classification": "all",
            "sort": "fullname",
            "customfieldname": "",
            "customfieldvalue": ""
        }
    }
]
```

返回信息：json，包含所有课程的信息，示例如下：

```json
[
    {
        "error": false,
        "data": {
            "courses": [
                {
                    "id": 11201,
                    "fullname": "《数据结构与C++程序设计》---C++程序设计姚分喜",
                    "shortname": "数据结构与C++程序设计",
                    "idnumber": "",
                    "summary": "<p dir=\"ltr\" style=\"text-align:left;\">《数据结构与C++程序设计》课程内容分为数据结构和C++程序设计两部分。本乐学课程为C++程序设计部分，使学生掌握面向对象编程语言的基础知识及Windows环境下应用程序设计开发的方法。<br /></p>",
                    "summaryformat": 1,
                    "startdate": 1659974400,
                    "enddate": 1669053600,
                    "visible": true,
                    "showactivitydates": false,
                    "showcompletionconditions": true,
                    "fullnamedisplay": "《数据结构与C++程序设计》---C++程序设计姚分喜",
                    "viewurl": "https://lexue.bit.edu.cn/course/view.php?id=11201",
                    "courseimage": "{base64 formatted image}",
                    "progress": 66,
                    "hasprogress": true,
                    "isfavourite": false,
                    "hidden": false,
                    "showshortname": false,
                    "coursecategory": "自动化学院"
                }
            ],
            "nextoffset": 1
        }
    }
]
```

