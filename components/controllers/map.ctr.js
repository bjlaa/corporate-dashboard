;(function() {

  angular
    .module('corporateDash')
    
    .controller('MapController', function($http) { 

      var self = this;

      $http.get("../../data/maps.json")
      .then(function(response) {
        self.maps = response.data;
        console.log(self.maps);
      })
      .then(function() {
        var containerMaps = document.querySelector('.mapsContainer');
        var mapDiv = angular.element("<ui-gmap-google-map center='mapCtrl.map.center' zoom='mapCtrl.map.zoom'><ui-gmap-marker ng-repeat='marker in mapCtrl.markers' idKey='marker.id' coords='marker.coords'></ui-gmap-marker></ui-gmap-google-map>");
        containerMaps.append(mapDiv);
      })

    })
    /*
    .directive('addMaps', addMaps)
    function addMaps() {
      return {
        link: function (scope, elem, attr) {
            var mapDiv = angular.element("<ui-gmap-google-map center='mapCtrl.map.center' zoom='mapCtrl.map.zoom'><ui-gmap-marker ng-repeat='marker in mapCtrl.markers' idKey='marker.id' coords='marker.coords'></ui-gmap-marker></ui-gmap-google-map>");
            elem.append(mapDiv);

        }        
      }
    }
    */
})();
