;(function() {

  angular
    .module('corporateDash')
    .controller('IssuesController', function($http) {

      var self = this;

      $http.get("../../data/issues.json")
      .then(function(response) {
        self.issues = response.data;
      });
    });
})();