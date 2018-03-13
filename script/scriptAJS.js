var groupsApp = angular.module("groupsApp", []);

groupsApp.controller("groupCtrl", [
  "$scope",
  function($scope) {
    var groupsData = localStorage["groupsList"];

    $scope.groups = [
      {
        group: "A",
        team1: "Russia",
        team2: "Saudi Arabia",
        team3: "Egypt",
        team4: "Uruguay"
      },
      {
        group: "B",
        team1: "Portugal",
        team2: "Spain",
        team3: "Morocco",
        team4: "Iran"
      },
      {
        group: "C",
        team1: "France",
        team2: "Australia",
        team3: "Peru",
        team4: "Denmark"
      },
      {
        group: "D",
        team1: "Argentina",
        team2: "Iceland",
        team3: "Croatia",
        team4: "Nigeria"
      }
    ];

    $scope.groups2 = [
      {
        group: "E",
        team1: "Brazil",
        team2: "Switzerland",
        team3: "Costa Rica",
        team4: "Serbia"
      },
      {
        group: "F",
        team1: "Germany",
        team2: "Mexico",
        team3: "Sweden",
        team4: "South Korea"
      },
      {
        group: "G",
        team1: "Belgium",
        team2: "Panama",
        team3: "Tunisia",
        team4: "England"
      },
      {
        group: "H",
        team1: "Poland",
        team2: "Senegal",
        team3: "Colombia",
        team4: "Japan"
      }
    ];
var conc = $scope.groups.concat($scope.groups2);

    localStorage["groupsData"] = JSON.stringify(conc);
  }
]);
