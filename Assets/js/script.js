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
var todaysWeatherIconEl = $('#todaysWeatherIcon')
var arrayStorage = JSON.parse(localStorage.getItem('filteredCities')) || [];


// get local storage and display as buttons

$(document).ready(function () {
  updateHistory();
})

var updateHistory = function() {
  $('.searchHistory').empty();
  var searchHistory = JSON.parse(localStorage.getItem('filteredCities')) || [];
  searchHistory.forEach(function (cityName) {
    var cityButton = $('<button>');
    cityButton.text(cityName);
    cityButton.attr('type', 'button');
    cityButton.addClass('list-group-item list-group-item-action')
    $('.searchHistory').prepend(cityButton);
  })
}


$('.searchHistory').on('click', 'button', function () {
  findCity($(this).text());
})

$('button[type="submit"]').click(function (event) {
  event.preventDefault();
  userCityName = $('#tags').val();
  findCity(userCityName)

});

function findCity(userCityName) {
  //get user location
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userCityName}&limit=1&appid=${APIKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      $('#tags').val('');
      if (data.length < 1) {
        alert('Please enter a city')
      } else {

        //store search history

        var chosenCity = data[0].name
        arrayStorage.push(chosenCity);
        var filteredCities = [...new Set(arrayStorage)]
        localStorage.setItem('filteredCities', JSON.stringify(filteredCities));
        updateHistory()



        console.log('array storage --> ', arrayStorage);
        console.log('filtered cities --> ', filteredCities)

        $('#cityName').text(chosenCity + " (" + todaysDate + ")");
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
            var iconCode = data.weather[0].icon;
            console.log(iconCode);
            if (iconCode) {
              todaysWeatherIconEl.removeClass('hidden');
              todaysWeatherIconEl.attr('src', `https://openweathermap.org/img/wn/${iconCode}.png`)

            }

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
              var cardElement = (document.querySelectorAll('.card-body'))[i + 1];

              var futureIconCode = data.list[i].weather[0].icon;
              var iconElSrc = `https://openweathermap.org/img/wn/${futureIconCode}.png`
              var temp = data.list[i].main.temp;
              var wind = data.list[i].wind.speed;
              var humidity = data.list[i].main.humidity;

              var date = (dayjs().add(i + 1, 'day')).format('YYYY-MM-DD');


              cardElement.innerHTML = `
              <p>${date}</p>
              <img src="${iconElSrc}" alt="Weather Icon" id="todaysWeatherIcon">
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
      }
    });
}
// Autocomplete cities
// $(function () {
//   var availableTags = [
//     "Toronto",
//     "Ottwa",
//     "Montreal"
//   ];
//   $("#tags").autocomplete({
//     source: availableTags
//   });
// });