
Plotly.d3.csv("UKcensus1851.csv", function(err, rows){

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);
  headerNames.push("Total");

  var headerValues = [];
  var cellValues = [];
  var censusVals = [];

  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }

  for (i=0; i < cellValues[3].length; i++) {
    males = cellValues[1][i];
    females = cellValues[2][i];
    total = Number(males) + Number(females);
    cellValues[3][i] = total.toString();
  }

  var tableMales = cellValues[1].map(function(x) {return Number(x).toLocaleString();});
  var tableFemales = cellValues[2].map(function(x) {return Number(x).toLocaleString();});
  var tableTot = cellValues[3].map(function(x) {return Number(x).toLocaleString();});

  censusVals.push(cellValues[0]);
  censusVals.push(tableMales);
  censusVals.push(tableFemales);
  censusVals.push(tableTot);

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
      values: censusVals,
      align: ["left", "left", "left", "left" ],
      line: {color: "black", width: 1},
      font: {family: "Arial", size: 12, color: ["black"]}
    }
  }]

  var ageColors = ['rgb(141,211,199)','rgb(255,255,179)','rgb(190,186,218)','rgb(251,128,114)','rgb(128,177,211)','rgb(253,180,98)','rgb(179,222,105)','rgb(252,205,229)','rgb(217,217,217)'];

  var censusLayout = {
    /*
    title: {
      text: "UK Census in 1851",
      font: {
        size: 30
      }
    }

     */
  }

  var malePieData = [{
    values: cellValues[1],
    labels: cellValues[0],
    textinfo: 'label',
    hoverinfo: "percent+value",
    type: 'pie',
    margin: {
      'l':0,
      'r':0,
    },
    marker: {
      colors: ageColors
    },
    textfont: {
      size: 15
    },
  }];

  var malePieLayout = {
    /*
    title: {
      text: 'UK Male population in 1851',
      font: {
        size: 30
      }
    },
    */
    showlegend: false,
    margin: {
      l: 0,
      pad: 0,
    },
    height: 600,
    width: 700
  };

  var femalePieData = [{
    values: cellValues[2],
    labels: cellValues[0],
    textinfo: "label",
    hoverinfo: "percent+value",
    type: 'pie',
    marker: {
      colors: ageColors
    },
    textfont: {
      size: 15
    },
  }];

  var femalePieLayout = {
    /*
    title: {
      text: 'UK Female population in 1851',
      font: {
        size: 30
      }
    },
     */
    height: 600,
    width: 700,
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
    /*
    title: {
      text: 'UK Male population in 1851',
      font: {
        size: 30
      }
    },

     */
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
    margin: {
      l: 100,
      t: 50,
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
    /*
    title: {
      text: 'UK Female Population in 1851',
      font: {
        size: 30
      }
    },

     */
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
    margin: {
      l:150,
      t:50,
      r: 50,

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
      colors: ['#A8A651','#DEC7FF'],
    },
    textfont: {
      size: 15,
      color: 'white'
    },
    textinfo: "label",
    hoverinfo: "label+value",
    type: 'pie'
  }];

  var totalPieLayout = {
    /*
    title: {
      text: 'UK Population by Gender',
      font: {
        size: 30
      }

    },

     */
    height: 600,
    width: 700,
  };

  var info = {
    'width': 857.1,
    'height': 1000,
    'path': 'm500 82v107q0 8-5 13t-13 5h-107q-8 0-13-5t-5-13v-107q0-8 5-13t13-5h107q8 0 13 5t5 13z m143 375q0 49-31 91t-77 65-95 23q-136 0-207-119-9-14 4-24l74-55q4-4 10-4 9 0 14 7 30 38 48 51 19 14 48 14 27 0 48-15t21-33q0-21-11-34t-38-25q-35-16-65-48t-29-70v-20q0-8 5-13t13-5h107q8 0 13 5t5 13q0 10 12 27t30 28q18 10 28 16t25 19 25 27 16 34 7 45z m214-107q0-117-57-215t-156-156-215-58-216 58-155 156-58 215 58 215 155 156 216 58 215-58 156-156 57-215z',
    'transform': 'matrix(1 0 0 -1 0 850)'
  };

  var message = 'Graph Created by Levy Matsuda\n'+
      'Tools used: Plotly.js, Leaflet.js,MapBox,ColorBrewer,AdobeColor\n' + 'Sources: http://www.visionofbritain.org.uk/';

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

  Plotly.newPlot('censusTable', censusData, censusLayout, config);
  Plotly.newPlot('malePie', malePieData, malePieLayout, config);
  Plotly.newPlot('femalePie',femalePieData, femalePieLayout, config);
  Plotly.newPlot('maleBar',maleBarData, maleBarLayout, config);
  Plotly.newPlot('femaleBar',femaleBarData, femaleBarLayout, config);
  Plotly.newPlot('totalPie',totalPieData, totalPieLayout, config);
});
