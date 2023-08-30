const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetAllCourse } = require("../controllers/CourseController");


router.get("/all", LexueCookieParser, GetAllCourse);

module.exports = router;