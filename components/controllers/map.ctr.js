;(function() {

  angular
    .module('corporateDash')
    
    .controller('MapController', function($scope, $http, $compile) { 

      var self = this;


      // Here we fetch our data and then append the google maps directive div
      var getFile = function() {
        $http.get("../../data/maps.json")
        .then(function(response) {
          self.maps = response.data;
        })
        .then(function() {
          var zoomNum = Number(self.maps.map.zoom);
          self.zoom = zoomNum;
          var containerMaps = angular.element(document.querySelector('.mapsContainer') );
          var mapDiv = angular.element("<ui-gmap-google-map class='ggl-map' center='mapCtrl.maps.map.center' zoom='mapCtrl.zoom' ><ui-gmap-marker ng-repeat='marker in mapCtrl.maps.markers'  idKey='marker.id' coords='marker.coords' options='marker.options'><ui-gmap-window  show='false' ><div><p>We have {{ marker.options.labelContent }} employees here! </p></div></ui-gmap-window></ui-gmap-marker></ui-gmap-google-map>");
          var compiledMapDiv = $compile(mapDiv)($scope)
          if(document.querySelector('.ggl-map')) {
            return;
          } else {
            containerMaps.append(mapDiv);
          }          
        });
      };




      //This is our long polling for the map's data
      var currentURL = window.location.hash.substr(1);
      var interval;

      var checkUrl = function() {
        clearInterval(interval);
        currentURL = window.location.hash.substr(1);
        setTimeout(function() {
          if(currentURL == "/geo") {
            interval = setInterval(function() {
              getFile();  
            }, 1000);        
          } else {
            clearInterval(interval);
          }
        }, 100);
      }

      getFile();
      checkUrl();


      var cleanPoll = function() {
        console.log("cleaning poll");
        clearInterval(interval);
      }

      var home = document.querySelector('.home');
      var metrics = document.querySelector('.metrics');
      var issues = document.querySelector('.issues');
      var homeResp = document.querySelector('.homeResp');
      var metricsResp = document.querySelector('.metricsResp');
      var issuesResp = document.querySelector('.issuesResp');

      var navArray = [home, metrics, issues, homeResp, metricsResp, issuesResp];

      navArray.map(function(e) {
        e.onclick= function() {
          cleanPoll();
        };
      });

    })
})();
