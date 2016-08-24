;(function() {
  'use strict';

  angular.module('corporateDash')
    .directive('googleCharts', googleCharts);


  function googleCharts() {

    var directiveDefinitionObject = {
      restrict: 'E',
      templateUrl: 'components/directives/google-charts.html',
      link: function(scope, elem, attrs, ctrl) {
        console.log(elem);
        const currentURL = window.location.hash.substr(1);
        const spinner = elem[0].childNodes[1].children[0];
        const line = elem[0].childNodes[1].children[1];
        const bar = elem[0].childNodes[1].children[2];
        console.log(currentURL, spinner, line, bar);

        function hideSpinner() {
          spinner.hidden = false;

          setTimeout(function() {
            spinner.hidden = true;
          }, 999);          
        }

        if(currentURL == "/metrics") {
            hideSpinner();
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

          data.addRows([
            [0, 0],   [3, 10],  [5, 27], [7, 40], [10, 54], [11, 52], [12, 58], 
            [13, 67], [14, 75], [15, 75], [16, 80]
          ]);

          var options = {
            title: 'Our number of Customers over the last 16 years',
            hAxis: {
              title: 'Time'
            },
            vAxis: {
              title: 'Customers'
            }, 
            viewWindow: {
              min: [2000],
              max: [2016]
            },
            width: 300
          };

          var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

          chart.draw(data, options);
        }
        // Draws our column chart
        function drawBar() {

          var data = new google.visualization.DataTable();
          data.addColumn('number', 'Date');
          data.addColumn('number', 'Issues');

          data.addRows([
            [2000, 1],
            [2001, 2],
            [2002, 3],
            [2005, 4],
            [2004, 5],
            [2005, 6],
            [2007, 7],
            [2009, 8],
            [2012, 9],
            [2016, 10],
          ]);

          var options = {
            title: 'Number of reported issues over the last 16 years',
            hAxis: {
              title: 'Date',
              viewWindow: {
                min: [2000],
                max: [2016]
              }
            },
            vAxis: {
              title: 'Issues'
            },
            width: 300
          };

          var chart2 = new google.visualization.ColumnChart(
            document.getElementById('chart_div2'));

          chart2.draw(data, options);
        }


        // Draws our charts only if matching url
        if(currentURL == "/metrics") {
          drawCharts();
        }
      }
    };

    return directiveDefinitionObject;
  }


})();