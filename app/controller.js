/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('corporateDash')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;

    self.data = {
      client1: {
        submission: '18/08/12',
        customer: 'H&M',
        email: 'handm@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '19/08/12',
        employee: 'William'
      },
      client2: {
        submission: '22/03/13',
        customer: 'Zara',
        email: 'zara@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '27/04/13',
        employee: 'Tyron'
      },
      client3: {
        submission: '18/08/12',
        customer: 'H&M',
        email: 'handm@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '19/08/12',
        employee: 'William'
      },
      client4: {
        submission: '22/03/13',
        customer: 'Zara',
        email: 'zara@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '27/04/13',
        employee: 'Tyron'
      },
      client5: {
        submission: '18/08/12',
        customer: 'H&M',
        email: 'handm@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '19/08/12',
        employee: 'William'
      },
      client6: {
        submission: '22/03/13',
        customer: 'Zara',
        email: 'zara@gmail.com',
        description: 'An issue regarding clothes',
        status: 'Closed',
        closed: '27/04/13',
        employee: 'Tyron'
      }    
    };
  }


})();