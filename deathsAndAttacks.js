// source : https://plotly.com/javascript/table/
Plotly.d3.csv("choleraDeaths.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);
  headerNames.push("Total Attacks");
  headerNames.push("Total Deaths");

  //setting date, attack, and death columns
  var headerValues = [];
  var cellValues = [];
  for (i = 0; i < headerNames.length; i++) {
    headerValues[i] = [headerNames[i]];
    cellValues[i] = unpack(rows, headerNames[i]);
  }

  prevTotDeaths = 0;
  prevTotAttacks = 0;
  //setting total attacks and total deaths
  for (i = 0; i < cellValues[3].length; i++) {
    totalAttacks = Number(cellValues[1][i])+prevTotAttacks;
    totalDeaths = Number(cellValues[2][i])+prevTotDeaths;
    cellValues[3][i] = totalAttacks.toString();
    cellValues[4][i] = totalDeaths.toString();
    prevTotDeaths = totalDeaths;
    prevTotAttacks = totalAttacks;
  }



  var tableData = [{
    type: 'table',
    columnorder: [0,1,2,3,4],
    header: {
      values: headerValues,
      align: ["left"],
      line: {width: 1, color: 'rgb(50, 50, 50)'},
      fill: {color: ['#3A5B94']},
      font: {family: "Arial", size: 15, color: "white"}
    },
    cells: {
      values: cellValues,
      align: ["left"],
      line: {color: "black", width: 1},
      font: {family: "Arial", size: 12, color: ["black"]}
    }
  }];

  var attackTrace = {
    x: cellValues[0],
    y: cellValues[1],
    mode: 'lines+markers',
    name: 'Attacks',
    marker: {
      color: '#7EF594',
      size: 4
    },
    line: {
      color: '#7EF594',
      width: 2
    }
  };

  var deathTrace = {
    x: cellValues[0],
    y: cellValues[2],
    mode: 'lines+markers',
    name: 'Deaths',
    marker: {
      color: '#F5738A',
      size: 4
    },
    line: {
      color: '#F5738A',
      width: 2
    }
  };

  var totAttackTrace = {
    x: cellValues[0],
    y: cellValues[3],
    mode: 'lines+markers',
    name: 'Total Attacks',
    line: {
      color: '#2AA341',
      width: 2
    },
    marker: {
      color: '#2AA341',
      size: 4
    }
  };

  var totDeathTrace = {
    x: cellValues[0],
    y: cellValues[4],
    mode: 'lines+markers',
    name: 'Total Deaths',
    line: {
      color: '#C2293B',
      width: 2
    },
    marker: {
      color: '#C2293B',
      size: 4
    }
  };


  var lineData = [attackTrace, deathTrace, totAttackTrace, totDeathTrace];

  var tableLayout = {
  };
  
  var layout = {
    xaxis: {
      title: 'Date',
      tickangle: -45
    },
    yaxis: {
      title: 'Amount of Cases'
    },
    legend: {
      x: 1,
      xanchor: 'left',
      y: 1
    }
  };

  var info = {
    'width': 857.1,
    'height': 1000,
    'path': 'm500 82v107q0 8-5 13t-13 5h-107q-8 0-13-5t-5-13v-107q0-8 5-13t13-5h107q8 0 13 5t5 13z m143 375q0 49-31 91t-77 65-95 23q-136 0-207-119-9-14 4-24l74-55q4-4 10-4 9 0 14 7 30 38 48 51 19 14 48 14 27 0 48-15t21-33q0-21-11-34t-38-25q-35-16-65-48t-29-70v-20q0-8 5-13t13-5h107q8 0 13 5t5 13q0 10 12 27t30 28q18 10 28 16t25 19 25 27 16 34 7 45z m214-107q0-117-57-215t-156-156-215-58-216 58-155 156-58 215 58 215 155 156 216 58 215-58 156-156 57-215z',
    'transform': 'matrix(1 0 0 -1 0 850)'
  }

  var message = 'Graph Created by Levy Matsuda\n'+
                'Tools used: Plotly.js, ColorBrewer, AdobeColor\n';

  var config = {
    responsive: true,
    scrollZoom: true,
    modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines','toImage', 'toggleHover'],
    modeBarButtonsToAdd: [
      {
        name: 'Information',
        icon: info,
        click: function(e) {
          alert(message);
        }

        }]

  };

  Plotly.newPlot('attackTable', tableData, tableLayout, config);

  Plotly.newPlot('choleraLine', lineData, layout, config);
});