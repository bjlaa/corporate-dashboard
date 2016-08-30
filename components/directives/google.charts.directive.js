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

          


          function hideSpinner() {
            spinner.hidden = false;

            setTimeout(function() {
              spinner.hidden = true;
            }, 999);          
          }

          var drawCharts = function() {
              // Loads the google line chart 
              google.charts.setOnLoadCallback(drawLine);
              // Loads the google column chart
              google.charts.setOnLoadCallback(drawBar);

          }
          var drawChartsDelayed = function() {
            // This setTimeout helps avoiding an loading error the first time 
            // the Metrics page is acccessed
            setTimeout(function() {
              drawCharts();
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
            drawChartsDelayed();
          }

          
          //This is our long polling for the charts' data
          var interval;

          var checkUrl = function() {
            clearInterval(interval);
            setTimeout(function() {
              currentURL = window.location.hash.substr(1);
              if(currentURL == "/metrics") {
                interval = setInterval(function() {
                  getFile();
                  drawCharts();
                }, 1000);        
              } else {
                clearInterval(interval);
              }
            }, 100)
            
          }



          getFile();
          checkUrl();

          var cleanPoll = function() {
            console.log("cleaning poll");
            clearInterval(interval);
          }

          var home = document.querySelector('.home');
          var geo = document.querySelector('.geo');
          var issues = document.querySelector('.issues');
          var homeResp = document.querySelector('.homeResp');
          var geoResp = document.querySelector('.geoResp');
          var issuesResp = document.querySelector('.issuesResp');
          var navArray = [home, geo, issues, homeResp, geoResp, issuesResp];

          navArray.map(function(e) {
            e.onclick= function() {
              cleanPoll();
            };
          });
        }
      }; 

      return directiveDefinitionObject;     
    }


})();