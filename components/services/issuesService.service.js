/*
;(function() {


  'use strict';

  angular
    .module('corporateDash')
    .factory('issuesService', function($http) {
      var getIssues = function() {
        // then() returns a new promise. We return that new promise.
        // that new promise is resolved via response.data

        return $http.get('../../data/issues.json').then(function(response) {    
          return response.data;
        });
      };
    });
})();
*/

