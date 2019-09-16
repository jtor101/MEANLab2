// Out-of-the-box requires
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

const hbs = require("hbs");

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var leaguesRouter = require("./routes/leagues");
var teamsRouter = require("./routes/teams");
var divRouter = require("./routes/divisions");
var regRouter = require("./routes/regteam");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// register partials
hbs.registerPartials(__dirname + "/views/partials");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "hca2",
    resave: "true",
    saveUninitialized: "true"
  })
);

// Use routes
// http://localhost:3000/
app.use("/", indexRouter);
// http://localhost:3000/users
app.use("/users", usersRouter);
// http://localhost:3000/
app.use("/leagues", leaguesRouter);
// http://localhost:3000/
app.use("/teams", teamsRouter);
// http://localhost:3000/divisions
app.use("/divisions", divRouter);
// http://localhost:3000/registerteam
app.use("/registerteam", regRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
