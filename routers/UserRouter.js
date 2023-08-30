const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetUserInfo } = require("../controllers/UserController");


router.get("/info", LexueCookieParser, GetUserInfo);

module.exports = router;