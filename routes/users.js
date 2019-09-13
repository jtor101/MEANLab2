// Express requires
var express = require("express");
var router = express.Router();

// Utils module require
var users = require("./../utils/auth");

// GET http://localhost:3000/users/login
router.get("/login", function(req, res, next) {
  res.render("login", { title: "Login" });
});

// GET http://localhost:3000/users/register
router.get("/register", function(req, res, next) {
  res.render("register", { title: "Register" });
});

// POST http://localhost:3000/users/login
router.post("/login", function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  // Authorize login
  if (users.authUser(username, password)) {
    res.statusCode = 200;
  } else {
    res.statusCode = 403;
  }
  res.end();
});

// POST http://localhost:3000/users/register
router.post("/register", function(req, res, next) {
  // Get user input
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var user = users.insertUser(username, email, password);
  if (user) {
    res.statusCode = 200;
  } else {
    res.statusCode = 403;
  }
  res.end();
});

module.exports = router;
