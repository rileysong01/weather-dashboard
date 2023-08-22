var APIKey = '6a82648f608cb51105c97d4fdaddde1f';
var userCityName;
var userLat;
var userLon;


// fetch weather data 
$('button[type="submit"]').click(function (event) {
  event.preventDefault();
  userCityName = $('#tags').val()

  //get user location
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userCityName}&limit=1&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#cityName').text(data[0].name)
      console.log(data)
      userLat = data[0].lat;
      userLon = data[0].lon;

      //get current weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${APIKey}&units=metric`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $('#todaysTemp').text('Temp: ' + data.wind.speed + '℃')
          $('#todaysWind').text('Wind: ' + data.main.temp + 'Km/H')
          $('#todaysHumidity').text('Humidity: ' + data.main.humidity + '%')
        });

      //get next 5 day daily weather data (API KEY NOT VALID??)
      fetch(`https://api.openweathermap.org/data/2.5/forecast?daily&lat=${userLat}&lon=${userLon}&cnt=5&appid=${APIKey}`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
        });
    });

  var todaysWeather = function () {
    $('#cityName').text()
  }



})


// Autocomplete cities
$(function () {
  var availableTags = [
    "Toronto",
    "Ottwa",
    "Montreal"
  ];
  $("#tags").autocomplete({
    source: availableTags
  });
});