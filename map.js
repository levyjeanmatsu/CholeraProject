Plotly.d3.csv("choleraDeathLocations.csv", function(err, rows){

  var mymap = L.map('mapId').setView([51.5287352,-0.3817827], 10);

  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGV2eWplYW4iLCJhIjoiY2tmZzRrdTBhMDF5eTJxcHAyc2oyeTUxbyJ9.4gtxzCh3vsajA99VB5fk7g'
  }).addTo(mymap);

  rows.map(function(row){
    if (row.deaths == 0) {
      row.type = 'pump';
    } else  {
      row.type = 'death';
    }
  });

  rows.map(function(row){
    if (row.type == 'pump') {
      row.text = ' ';
    } else {
      row.text = row.deaths;
    }
  });

  var types = ['pump', 'death'];


  var long = unpack(rows, 'long');
  var lat = unpack(rows, 'lat');
  var type = unpack(rows, 'type');
  var markers = [];

  for (i = 0; i < rows.length; i++) {
    if (type[i] == 'pump') {
      marker = L.marker([Number(lat[i]),Number(long[i])]).addTo(mymap);
      marker.bindPopup('I am a pump');
    } else {
      circle = L.circle([Number(lat[i]),Number(long[i])], {
        color: 'blue',
        fillOpacity: 0,
        fillColor: 'blue',
        radius: 0.5
      }).addTo(mymap);
      marker.bindPopup('I am a death')
    }


  }






});