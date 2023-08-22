var APIKey = '6a82648f608cb51105c97d4fdaddde1f';
var userCityName;
var userLat;
var userLon;
var todaysDate = (dayjs()).format('YYYY-MM-DD');
var oneDayAfter = (dayjs().add(1, 'day')).format('YYYY-MM-DD');
var twoDayAfter = (dayjs().add(2, 'day')).format('YYYY-MM-DD');
var threeDayAfter = (dayjs().add(3, 'day')).format('YYYY-MM-DD');
var fourDayAfter = (dayjs().add(4, 'day')).format('YYYY-MM-DD');
var fiveDayAfter = (dayjs().add(5, 'day')).format('YYYY-MM-DD');

// fetch weather data 

$('button[type="submit"]').click(function (event) {
  event.preventDefault();
  userCityName = $('#tags').val();

  //get user location
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userCityName}&limit=1&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $('#cityName').text(data[0].name + " (" + todaysDate + ")");
      console.log(data);
      userLat = data[0].lat;
      userLon = data[0].lon;

      //get current weather data
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${APIKey}&units=metric`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $('#todaysTemp').text('Temp: ' + data.main.temp + '°C');
          $('#todaysWind').text('Wind: ' + data.wind.speed + ' m/s');
          $('#todaysHumidity').text('Humidity: ' + data.main.humidity + '%');
        });

      //get next 5 day daily weather data 
      fetch(`https://api.openweathermap.org/data/2.5/forecast?daily&lat=${userLat}&lon=${userLon}&cnt=5&appid=${APIKey}&units=metric`)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (let i = 0; i < 5; i++) {
            var cardElement = (document.querySelectorAll('.card-body'))[i+1];
      
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;
      
            var date = (dayjs().add(i+1, 'day')).format('YYYY-MM-DD');

            cardElement.innerHTML = `
              <p>${date}</p>
              <p>Temp: ${temp} °C</p>
              <p>Wind: ${wind} m/s</p>
              <p>Humidity: ${humidity}%</p>
            `;

            $(cardElement).css({
              'font-size': 'small',
              'padding-left': '10px',
              'padding-right': '10px'
            });
          }
        });
    });
});


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