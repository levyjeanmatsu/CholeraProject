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
  console.log(cellValues);
  console.log(headerValues);
  console.log(cellValues[2][1]);

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
    columnwidth: [200,200,200,200,200],
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
    title: {
      text: "Cholera Deaths and Attacks in 1854",
      font: {
        size: 30
      }
    },
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


  var config = {response: true};

  Plotly.newPlot('attackTable', tableData, tableLayout, config);

  Plotly.newPlot('choleraLine', lineData, layout, config);
});