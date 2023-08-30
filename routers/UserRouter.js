const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetSelfInfo, GetUserInfo } = require("../controllers/UserController");


router.get("/info", LexueCookieParser, GetSelfInfo);

router.get("/info/:id", LexueCookieParser, GetUserInfo);

module.exports = router;