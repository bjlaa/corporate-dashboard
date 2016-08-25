;(function() {
  let getIssues;
  angular
    .module('corporateDash')
    .controller('IssuesController', function($http) {

      let self = this;

      $http.get("../../data/issues.json")
      .then(function(response) {
        self.issues = response.data;
      })
    });
})();