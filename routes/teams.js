var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET leagues.json page. */
// http://localhost:3000/leagues/data
router.get("/data", function(req, res, next) {
  try {
    res.end(fs.readFileSync("./data/teams.json"));
  } catch (err) {
    res.end("[]");
  }
});

router.get("/teams/data/:id", function(req, res) {
  let id = req.params.id;
  console.log("Received a GET request for teams in league " + id);

  let data = fs.readFileSync(__dirname + "/data/teams.json", "utf8");
  data = JSON.parse(data);

  // find the matching teams for
  let matches = getMatchingTeamsByLeague(id, data);

  //console.log("Returned data is: ");
  //logArrayOfTeams(matches);
  res.end(JSON.stringify(matches));
});

module.exports = router;
