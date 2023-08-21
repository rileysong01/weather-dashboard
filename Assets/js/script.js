var APIKey = "6a82648f608cb51105c97d4fdaddde1f";
var userCityName;
var userStateCode;
var userCountry;

fetch ('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}')

fetch('https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid='+ APIKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  $( function() {
    var availableTags = [
      "Toronto",
      "Ottwa",
      "Montreal"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );