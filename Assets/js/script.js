var APIKey = "6a82648f608cb51105c97d4fdaddde1f";
var userCityName;
var userStateCode;
var userCountry;

fetch ('http://api.openweathermap.org/geo/1.0/direct?q=Toronto&limit=5&appid=${APIKey}')
.then(function (response) {
  return response.json();
})
.then(function(data) {
  console.log(data)
});

fetch('https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid='+ APIKey)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Autocomplete cities
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

  // 
$('button[type="submit"]').click(function (){

})