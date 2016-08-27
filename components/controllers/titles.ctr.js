;(function() {

  angular
    .module('corporateDash')
    .controller('TitlesController', function($http) {

      var self = this;

      $http.get("../../data/titles.csv")
      .then(function(response) {
        var arrayTitles = response.data.split(',');
        self.titles = arrayTitles;
      });
    });
})();