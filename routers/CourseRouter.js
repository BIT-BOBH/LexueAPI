const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetAllCourse, GetCourseContent, GetCourseMembers } = require("../controllers/CourseController");


router.get("/all", LexueCookieParser, GetAllCourse);

router.get("/content/:id", LexueCookieParser, GetCourseContent);

router.get("/members/:id", LexueCookieParser, GetCourseMembers);

module.exports = router;