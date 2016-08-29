;(function() {

  angular
    .module('corporateDash')
    .controller('IssuesController', function($http,$timeout) {

      var self = this;


      var getFile = function() {
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
      var interval;

      var checkUrl = function() {
        clearInterval(interval);
        currentURL = window.location.hash.substr(1);
        if(currentURL == "/issues") {
          getFile();
          interval = setInterval(function() {
            console.log("Update data");
            getFile();  
          }, 30000);        
        } else {
          clearInterval(interval);
        }
      }
      getFile();
      checkUrl();

      window.onhashchange = checkUrl;
    });
})();