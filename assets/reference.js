var resultCityEl = document.querySelector('#result-city');
var resultCityContentEl = document.querySelector('#result-city-content');
var searchCityInput = document.querySelector('#search-city-input');
var futureForecastEl = document.querySelector('#city-future-forecast');
var searchCityEl = document.querySelector('#search-city');
var searchButtonEl = document.querySelector('#search-button');



searchButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCityInput.value + '&appid=4f91554c02ad030923836326342b4267')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var tempValue = data['main']['temp'];
            var cityNameValue = data['name'];
            var humidityValue = data['main']['humidity'];
            var today = moment();
            var windValue = data['wind']['speed'];


            var tempValueCelcius = Math.round(tempValue - 273.15)

            document.getElementById('result-city').innerHTML = cityNameValue
            document.getElementById('temp').innerHTML = 'Temp: ' + tempValueCelcius + ' \u00B0C'
            document.getElementById('wind').innerHTML = 'Wind: ' + windValue + ' MPH'
            document.getElementById('humidity').innerHTML = 'Humidity: ' + humidityValue + '%'
            // document.getElementById('today-date').innerHTML.textContent(today.format("MMM Do, YYYY"));
        });


function getCityForecast(){

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=current,hourly,minutely,alerts&units=metric&appid=4f91554c02ad030923836326342b4267`)
           .then(function(response){
               return response.json();
           })
           .then(function (data){
               console.log(data);
    
           })
            .catch ((error) => {
                console.log(error);
            })

}

var searchCityEl = document.querySelector('#search-city');

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchCityVal = document.querySelector('#search-city-input').value;
  
    if (!searchCityVal) {
      console.error('You need to enter a city!');
      return;
    }
  
    // Need to refer back to this
    // var queryString = './search-results.html?q=' + searchCityVal + '&format=' + formatInputVal;
  
    // location.assign(queryString);
    // url required
    location.assign(searchCityVal);
  }
  
searchCityEl.addEventListener('submit', handleSearchFormSubmit);