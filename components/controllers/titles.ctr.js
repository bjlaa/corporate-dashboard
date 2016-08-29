;(function() {

  angular
    .module('corporateDash')
    .controller('TitlesController', function($http) {

      var self = this;

      var getFile = function() {
        $http.get("../../data/titles.csv")
        .then(function(response) {
          var arrayTitles = response.data.split(',');
          self.titles = arrayTitles;
        });
      }

      getFile();
      setInterval(function() {
        getFile();  
      }, 30000);         
    });
})();