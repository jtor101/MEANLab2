var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET leagues page. */
// http://localhost:3000/leagues
router.get("/", function(req, res, next) {
  res.render("registerteam");
});

module.exports = router;
