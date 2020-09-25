Plotly.d3.csv("choleraDeaths.csv", function(err, rows) {
  function separate(rows, keys) {
    return rows.map(function(row) {return row[key]; });
  }

  var headers = Plotly.d3.keys(rows[0]);

  var headerVals = [];
  var cellVals = [];

  for (i = 0; i < headers.length; i++) {
    heaverVals = [headers[i]];
    val = separate(rows, headers[i]);
    cellVals[i] = val;
  }


})