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
        var windValue = data['wind']['speed']

        document.getElementById('result-city').value = cityNameValue
        document.getElementById('today-date').value = moment().today
        document.getElementById('temp').value = tempValue
        document.getElementById('wind').value = windValue
        document.getElementById('humidity').value = humidityValue
        console.log(data);
    })
    .catch((error)=> {
        console.log(error);
    })
});


