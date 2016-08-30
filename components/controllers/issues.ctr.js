;(function() {

  angular
    .module('corporateDash')
    .controller('IssuesController', function($http,$timeout) {

      var self = this;


      var getFileIssues = function() {
        $http.get("../../data/issues.csv")
          .then(function(response) {
            var csvFile = response.data;
            var csvLines = csvFile.split(/\r\n|\n/);
            var csvArray = [];
            csvLines.map(function(line) {
              var splitted =line.split(",");
              csvArray.push(splitted);
            });
            self.issues = csvArray;
          });        
      }; 

      //This is our long polling for the issues' data
      var currentURL = window.location.hash.substr(1);
      var intervalIssues;

      var checkUrlIssues = function() {
        clearInterval(intervalIssues);
        currentURL = window.location.hash.substr(1);
        if(currentURL == "/issues") {
          getFileIssues();
          intervalIssues = setInterval(function() {
            getFileIssues();  
          }, 1000);        
        } else {
          clearInterval(intervalIssues);
        }
      }
      getFileIssues();
      checkUrlIssues();

      var cleanPoll = function() {
        console.log("cleaning poll");
        clearInterval(intervalIssues);
      }

      var home = document.querySelector('.home');
      var geo = document.querySelector('.geo');
      var metrics = document.querySelector('.metrics');
      var navArray = [home, geo, metrics];

      navArray.map(function(e) {
        e.onclick= function() {
          cleanPoll();
        };
      });
    });
})();