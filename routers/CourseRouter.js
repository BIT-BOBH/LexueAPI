const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetAllCourse, GetCourseContent } = require("../controllers/CourseController");


router.get("/all", LexueCookieParser, GetAllCourse);

router.get("/content/:id", LexueCookieParser, GetCourseContent);

module.exports = router;