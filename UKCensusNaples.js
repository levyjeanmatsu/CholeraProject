Plotly.d3.csv("naplesCholeraAgeSexData.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);

  var headerValues = [];
  var cellValues = [];
  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }


  var naplesData = [{
    type: 'table',
    columnwidth: [150,200,200],
    columnorder: [0,1,2,3],
    header: {
      values: headerValues,
      align: "left",
      line: {width: 1},
      fill: {color: ['#3A5B94']},
      font: {family: "Arial", size: 15, color: "white"}
    },
    cells: {
      values: cellValues,
      align: ["left", "left","left"],
      line: {color: "black", width: 1},
      font: {family: "Arial", size: 12, color: ["black"]}
    }
  }]

  var layout = {
    title: {
      text: "Fatalities in Naples",
      font: {
        size: 30
      }
    }
  }

  var config = {responsive: true};

  Plotly.newPlot('naplesTable', naplesData, layout, config);
});

Plotly.d3.csv("UKcensus1851.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);
  headerNames.push("Total");

  var headerValues = [];
  var cellValues = [];
  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }

  //source: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  function formatCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  for (i=0; i < cellValues[3].length; i++) {
    males = cellValues[1][i];
    females = cellValues[2][i];
    total = Number(males) + Number(females);
    cellValues[3][i] = total;
  }



  var censusData = [{
    type: 'table',
    columnwidth: [300,600,1000],
    columnorder: [0,1,2,3],
    header: {
      values: headerValues,
      align: "left",
      line: {width: 1},
      fill: {color: ['#3A5B94']},
      font: {family: "Arial", size: 15, color: "white"}
    },
    cells: {
      values: cellValues,
      align: ["left", "left", "left", "left" ],
      line: {color: "black", width: 1},
      font: {family: "Arial", size: 12, color: ["black"]}
    }
  }]

  var ageColors = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)','rgb(217,217,217)'];

  var censusLayout = {
    title: {
      text: "UK Census: Male and Females living in the UK at the same time",
      font: {
        size: 30
      }
    }
  }

  var malePieData = [{
    values: cellValues[1],
    labels: cellValues[0],
    type: 'pie',
    marker: {
      colors: ageColors
    },
    textfont: {
      size: 15
    },
  }];

  var malePieLayout = {
    title: {
      text: 'Men living in the UK by Age',
      font: {
        size: 30
      }
    },
    height: 700,
    width: 1200
  };

  var femalePieData = [{
    values: cellValues[1],
    labels: cellValues[0],
    type: 'pie',
    marker: {
      colors: ageColors
    },
    textfont: {
      size: 15
    },
  }];

  var femalePieLayout = {
    title: {
      text: 'Females Living in the UK by Age',
      font: {
        size: 30
      }
    },

    height: 700,
    width: 1200
  };

  var maleAges = {
    x: cellValues[0],
    y: cellValues[1],
    name: 'Male Population',
    marker:{
      color: ageColors
    },
    type: 'bar'
  };

  var maleBarData = [maleAges];

  var maleBarLayout = {
    title: {
      text: 'Males living in the UK by Age',
      font: {
        size: 30
      }
    },
    xaxis: {
      title: {
        text: "Age Groups",
        size: 15
      }
    },
    yaxis: {
      title: {
        text: "Amount of People",
        size: 15
      }
    },
    barmode: 'group'};

  var femaleAges = {
    x: cellValues[0],
    y: cellValues[2],
    name: 'Female Population',
    marker:{
      color: ageColors
    },
    type: 'bar'
  };

  var femaleBarData = [femaleAges];

  var femaleBarLayout = {
    title: {
      text: 'Females living in the UK by Age',
      font: {
        size: 30
      }
    },
    xaxis: {
      title: {
        text: "Age Groups",
        size: 15
      }
    },
    yaxis: {
      title: {
        text: "Amount of People",
        size: 15
      }
    },
    barmode: 'group'};

  maleTotal = 0;
  femaleTotal = 0;
  for (i = 0; i < cellValues[1].length; i++) {
    currMale = Number(cellValues[1][i]);
    maleTotal = currMale + maleTotal;
    currFemale = Number(cellValues[2][i]);
    femaleTotal = currFemale + femaleTotal;
  }

  var totalPieData = [{
    values: [maleTotal,femaleTotal],
    labels: ['males', 'females'],
    marker: {
      colors: ['#8B9454','#BE8BE0'],
    },
    textfont: {
      size: 15,
      color: 'white'
    },
    hoverinfo: "label+value",
    type: 'pie'
  }];

  var totalPieLayout = {
    title: {
      text: 'UK Population by Gender',
      font: {
        size: 30
      }
    },
    height: 700,
    width: 1200
  };

  var config = {responsive: true};

  Plotly.newPlot('censusTable', censusData, censusLayout, config);
  Plotly.newPlot('malePie', malePieData, malePieLayout, config);
  Plotly.newPlot('femalePie',femalePieData, femalePieLayout, config);
  Plotly.newPlot('maleBar',maleBarData, maleBarLayout, config);
  Plotly.newPlot('femaleBar',femaleBarData, femaleBarLayout, config);
  Plotly.newPlot('totalPie',totalPieData, totalPieLayout, config);
});
