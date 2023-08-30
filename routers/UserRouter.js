const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetSelfInfo, GetUserInfo, GetUserPosts } = require("../controllers/UserController");


router.get("/info", LexueCookieParser, GetSelfInfo);

router.get("/info/:id", LexueCookieParser, GetUserInfo);

router.get("/posts/:id", LexueCookieParser, GetUserPosts);

module.exports = router;