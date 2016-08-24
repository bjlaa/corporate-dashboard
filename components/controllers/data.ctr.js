;(function() {

  angular
    .module('corporateDash')
    .controller('DataController', DataController);

  function DataController() {

    // 'controller as' syntax
    var self = this;
    var clients = "nouille";

    fetch('../../data/clients.json')
    .then(function(response) {
      response.json()
      .then(function(data) { 
        console.log(data);
        clients = data;
        console.log(clients);
        self.data = clients;
      });
    })

    
    console.log(self.data);
  }
})();