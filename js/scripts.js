;(function( $ ){

	/**
	 * In genereal you should avoid to use jQuery code in AngularJS
	 * apps, if you need any jQuery functionality create a directive
	 * 
	 */
  $(document).ready(function() {
    google.charts.load('current', {packages: ['corechart', 'line', 'bar']});
    var currentURL = window.location.hash.substr(1);
    if(currentURL == "/metrics") {
      google.charts.setOnLoadCallback(drawBasic);
      // Loads the google column chart
      google.charts.setOnLoadCallback(drawBasic2);
    }

    $(window).on('hashchange',function() {
      var currentURL = window.location.hash.substr(1);
      if(currentURL == "/metrics") {
      google.charts.setOnLoadCallback(drawBasic);
      // Loads the google column chart
      google.charts.setOnLoadCallback(drawBasic2);
      }
    });  
  });

  var drawCharts = function() {
    // Loads the google line chart 

  }

  // Draws our line chart
  function drawBasic() {

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
  function drawBasic2() {

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


  


})( jQuery );