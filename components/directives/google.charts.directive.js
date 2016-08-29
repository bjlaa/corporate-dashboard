;(function() {
  'use strict';

  angular.module('corporateDash')
    .directive('googleCharts', googleCharts);


    function googleCharts($http) {

      var getFile = function() {
        $http.get("../../data/charts.json")
        .then(function(response) {
          self.charts = response.data;
        })
      }


      var directiveDefinitionObject = {
        restrict: 'E',
        templateUrl: 'components/directives/google-charts.html',
        link: function(scope, elem, attrs, ctrl) {
          var currentURL = window.location.hash.substr(1);
          var spinner = document.querySelector('.spinner');

          //This is our long polling for the charts' data
          var interval;

          var checkUrl = function() {
            clearInterval(interval);
            currentURL = window.location.hash.substr(1);
            if(currentURL == "/metrics") {
              interval = setInterval(function() {
                console.log("Update data");
                getFile();  
              }, 30000);        
            } else {
              clearInterval(interval);
            }
          }

          getFile();
          checkUrl();

          window.onhashchange = checkUrl;


          function hideSpinner() {
            spinner.hidden = false;

            setTimeout(function() {
              spinner.hidden = true;
            }, 999);          
          }

          var drawCharts = function() {

            // This setTimeout helps avoiding an loading error the first time 
            // the Metrics page is acccessed
            setTimeout(function() {
              // Loads the google line chart 
              google.charts.setOnLoadCallback(drawLine);
              // Loads the google column chart
              google.charts.setOnLoadCallback(drawBar);
            }, 1000)
          }

          // Draws our line chart
          function drawLine() {

            var data = new google.visualization.DataTable();
            data.addColumn('number', 'X');
            data.addColumn('number', 'Clients');
            data.addRows(self.charts.line.rows);

            var options = self.charts.line.options;

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

            chart.draw(data, options);
          }
          // Draws our column chart
          function drawBar() {

            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Date');
            data.addColumn('number', 'Issues');

            data.addRows(self.charts.bars.rows);

            var options = self.charts.bars.options;

            var chart2 = new google.visualization.ColumnChart(
              document.getElementById('chart_div2'));

            chart2.draw(data, options);
          }

          // Draws our charts only if matching url
          if(currentURL == "/metrics") {
            hideSpinner();
            drawCharts();
          }
        }
      }; 
      return directiveDefinitionObject;     
    }


})();