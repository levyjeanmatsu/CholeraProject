import Plotly from 'plotly-latest.min.js'
import 'index.html'

var lineDiv = document.getElementbyId('lineChart');
var line1 = {
  x: [1, 2, 3, 4],
  y: [12, 15, 13, 17],
  type: 'scatter'
};

var line2 = {
  x: [1, 2, 3, 4],
  y: [16, 25, 11, 9],
  type: 'scatter'
};

var data = [line1, line2];

Plotly.newPlot(lineDiv, data);