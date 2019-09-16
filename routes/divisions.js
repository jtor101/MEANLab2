var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET leagues page. */
// http://localhost:3000/leagues
router.get("/", function(req, res, next) {
  res.render("divisions");
});

function getMatchingTeamById(id, data) {
  let match = data.find(t => t.TeamId == id);
  return match;
}

function getMatchingTeamsByLeague(leagueCode, data) {
  let matches = data.filter(t => t.League == leagueCode);
  return matches;
}

/* GET leagues.json page. */
// http://localhost:3000/leagues/data
router.get("/leagues/data", function(req, res, next) {
  try {
    res.end(fs.readFileSync("./data/leagues.json"));
  } catch (err) {
    res.end("[]");
  }
});

router.get("teams/data/:id", function(req, res) {
  let id = req.params.id;
  console.log("Received a GET request for team " + id);

  let data = fs.readFileSync(__dirname + "./data/teams.json", "utf8");
  data = JSON.parse(data);

  let match = getMatchingTeamById(id, data);
  if (match == null) {
    res.status(404).send("Not Found");
    return;
  }

  //console.log("Returned data is: ");
  //logOneTeam(match);
  res.end(JSON.stringify(match));
});

module.exports = router;
