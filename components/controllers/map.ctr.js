;(function() {

  angular
    .module('corporateDash')
    
    .controller('MapController', function($scope, $http, $compile) { 

      var self = this;

      // Here we fetch our data and then append the google maps directive div
      $http.get("../../data/maps.json")
      .then(function(response) {
        self.maps = response.data;
      })
      .then(function() {
        console.log(self.maps.map.zoom);
        var zoomNum = parseInt(self.maps.map.zoom);
        var containerMaps = angular.element(document.querySelector('.mapsContainer') );
        var mapDiv = angular.element("<ui-gmap-google-map center='mapCtrl.maps.map.center' zoom='zoomNum'><ui-gmap-marker ng-repeat='marker in mapCtrl.maps.markers' idKey='marker.id' coords='marker.coords' options='marker.options'></ui-gmap-marker></ui-gmap-google-map>");
        var compiledMapDiv = $compile(mapDiv)($scope);
        containerMaps.append(mapDiv);
      })

    })
})();
