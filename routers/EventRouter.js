const express = require("express");

const router = express.Router();

const LexueCookieParser = require("../middleware/LexueCookieParser");

const { GetSelfEvent } = require("../controllers/EventController");

router.get("/all", LexueCookieParser, GetSelfEvent);

module.exports = router;