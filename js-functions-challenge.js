var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}

var games = {
  teams   : null,
  winners : [],
  losers  : []
};


var rank = function (team) {
  scores = []
  for (var i = 0; i < games.teams.length; i++) {
    scores.push(wins(games.teams[i]));
  };

  scores = scores.sort(function(a, b){return b-a});
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] === wins(team)) {
      return i + 1;
    }
  }
  return scores;
};

var wins = function(team) {
  count = 0;
  for (var i = 0; i < games.winners.length; i++) {
    if (team === games.winners[i]) {
      count += 1;
    };
  };
  return count;
};

var losses = function(team) {
  count = 0;
  for (var i = 0; i < games.winners.length; i++) {
    if (team === games.losers[i]) {
      count += 1;
    };
  };
  return count;
};

var teamNames = function() {
  var teams   = [];
  for (var i = 0; i < gameInfo().length; i++) {
    var homeTeam = gameInfo()[i].home_team;
    var awayTeam = gameInfo()[i].away_team;
    teams.push(homeTeam);
    teams.push(awayTeam);

    if (gameInfo()[i].home_score > gameInfo()[i].away_score) {
      games.winners.push(homeTeam);
      games.losers.push(awayTeam);
    } else {
      games.losers.push(homeTeam);
      games.winners.push(awayTeam);
    }
  };
  var onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
  };
  var teams = teams.filter( onlyUnique );
  games.teams = teams;
};


var teamSummary = function(){
    console.log("-----------------------------------------")
    console.log("Name         Rank        Wins        Losses");
  for (var i = 0; i < games.teams.length; i++) {
    team = games.teams[i];
    console.log(team+"      "+rank(team)+"           "+wins(team)+"           "+losses(team));
  }
    console.log("-----------------------------------------");

    for (var i = 0; i < games.teams.length; i++) {
      teamStats(games.teams[i]);
    }
};

var teamStats = function(team){
  console.log(" ")
  console.log("Team Name: " + team);
  console.log("Rank: " + rank(team));
  console.log("Total Wins: " + wins(team));
  console.log("Total Losses: " + losses(team));
};

teamNames();
console.log(teamSummary());
