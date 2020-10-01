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
  };

  var maleAges = {
    x: cellValues[0],
    y: cellValues[1],
    name: 'Male Population',
    marker:{
      color: '#A8A651'
    },
    type: 'bar'
  };

  var femaleAges = {
    x: cellValues[0],
    y: cellValues[2],
    name: 'Male Population',
    marker:{
      color: '#DEC7FF'
    },
    type: 'bar'

  }
  var naplesBar = [maleAges, femaleAges];

  var naplesBarLayout = {
    title: {
      text: 'Naples Population',
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


  var info = {
    'width': 857.1,
    'height': 1000,
    'path': 'm500 82v107q0 8-5 13t-13 5h-107q-8 0-13-5t-5-13v-107q0-8 5-13t13-5h107q8 0 13 5t5 13z m143 375q0 49-31 91t-77 65-95 23q-136 0-207-119-9-14 4-24l74-55q4-4 10-4 9 0 14 7 30 38 48 51 19 14 48 14 27 0 48-15t21-33q0-21-11-34t-38-25q-35-16-65-48t-29-70v-20q0-8 5-13t13-5h107q8 0 13 5t5 13q0 10 12 27t30 28q18 10 28 16t25 19 25 27 16 34 7 45z m214-107q0-117-57-215t-156-156-215-58-216 58-155 156-58 215 58 215 155 156 216 58 215-58 156-156 57-215z',
    'transform': 'matrix(1 0 0 -1 0 850)'
  }

  var message = 'Graph Created by Levy Matsuda\n'+
      'Tools used: Plotly.js, ColorBrewer,AdobeColor\n' + 'Sources: "Naples in the Time of Cholera 1884-1911" p119\n' +
      'http://assets.cambridge.\n';

  var config = {
    responsive: true,
    modeBarButtonsToRemove: ['toImage', 'toggleHover'],
    modeBarButtonsToAdd: [
      {
        name: 'Information',
        icon: info,
        click: function(e) {
          alert(message);
        }

      }]

  };


  Plotly.newPlot('naplesTable', naplesData, layout, config);
  Plotly.newPlot('naplesBar', naplesBar, layout, config);

});
