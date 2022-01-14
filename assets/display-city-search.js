var resultCityEl = document.querySelector('#result-city');
var resultCityContentEl = document.querySelector('#result-city-content');
var searchCityInput = document.querySelector('#search-city-input');
var futureForecastEl = document.querySelector('#city-future-forecast');
var searchCityEl = document.querySelector('#search-city');
var searchButtonEl = document.querySelector('#search-button');



searchButtonEl.addEventListener('click', function(event){
    event.preventDefault();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCityInput.value +'&appid=4f91554c02ad030923836326342b4267')
    .then(function(response){
        return response.json();
    })
    .then(function (data){
        var tempValue = data['main']['temp'];
        var cityNameValue = data['name'];
        var humidityValue = data['main']['humidity'];
        var today = moment();
        var windValue = data['wind']['speed']

        document.getElementById('result-city').innerHTML = cityNameValue
        document.getElementById('temp').innerHTML = 'Temp: ' + tempValue
        document.getElementById('wind').innerHTML = 'Wind: ' + windValue + ' MPH'
        document.getElementById('humidity').innerHTML = 'Humidity: ' + humidityValue + '%'
        document.getElementById('today-date').innerHTML.textContent(today.format("MMM Do, YYYY"));
        console.log(data);
    })
    .catch((error)=> {
        console.log(error);
    })
});


