;(function() {

  angular
    .module('corporateDash')
    .controller('TitlesController', function($http) {

      let self = this;

      $http.get("../../data/titles.csv")
      .then(function(response) {
        let arrayTitles = response.data.split(',');
        self.titles = arrayTitles;
      })
    });
})();