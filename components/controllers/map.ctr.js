;(function() {

  angular
    .module('corporateDash')
    .controller('MapController', function($http) {

      let self = this;
      self.map = { center: { latitude: 52.518651, longitude: 13.404146 }, zoom: 14 };
      self.markers = {
        marker1: {
            id: 1,
            coords: { latitude: 52.520635, longitude: 13.414532 },
            click: {},
            options: {
              label: "awesome",
              animation: 1,
            }
        },  
        marker2: {
            id: 2,
            coords: { latitude: 52.518024, longitude: 13.384319 },
            click: {},
            options: {
              label: "awesome",
              animation: 1,
            }
        },
        marker3: {
            id: 3,
            coords: { latitude: 52.517444, longitude: 13.413050 },
            click: {},
            options: {
              label: "awesome",
              animation: 1,
            }
        },     
        marker4: {
            id: 4,
            coords: { latitude: 52.517444, longitude: 13.401050 },
            click: {},
            options: {
              label: "awesome",
              animation: 1,
            }
        } 
      };   
    });
})();
