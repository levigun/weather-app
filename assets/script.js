// created variables for the DOM elements
var searchButtonEl = document.getElementById('search-button');
var resultCityEl = document.getElementById('result-city');
var todayDate = document.getElementById('today-date');
var cityFutureForecast = document.getElementById('city-future-forecast');
var weatherIcon = document.getElementById('icon-weather');
var userCity = document.getElementById('search-city-input')
var time = document.getElementById('time');
var wind = document.getElementById('wind');
var humidity = document.getElementById('humidity');
var uvIndex = document.getElementById('uv-index');
var forecastHeading = document.getElementById('forecast-heading');
// created var for apikey
var apiKey = `4f91554c02ad030923836326342b4267`;

// created a click evetn function for the search button
searchButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    forecastHeading.textContent = "5-Day Forecast:";
    // fetched current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + userCity.value + `&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // use the data to display information
            var iconData = data.weather[0].icon;
            weatherIcon.src = "https://openweathermap.org/img/w/" + iconData + ".png";
            resultCityEl.textContent = data.name;
            todayDate.textContent = moment().format('L');
            temp.textContent = "Temp: " + (Math.round(data.main.temp) - 273) + " \u00B0C";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + Math.round(data.main.humidity) + " %";


            console.log(data.coord);
            // take the longitude and latitude value for the city being search to render the coming days weather forecast
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            // fetched one-call api
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=` + lat + `&lon=` + lon + `&exclude=current,hourly,minutely&units=metric&appid=${apiKey}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    uvIndex.textContent = "UV Index: " + data.daily[0].uvi;


                    let futureForecast = '';
                    data.daily.forEach((day, idx) => {
                        if (idx == 0) {
                            cityFutureForecast.innerHTML = ``
                        } else if(idx < 6){
                            futureForecast += ` <div class="weather-forecast-item">
                        <div class="day">${window.moment(day.dt * 1000).format('L')}</div>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                        <div class="temp">Temp: ${day.temp.night}&#176; C</div>
                        <div class="wind">Wind: ${day.wind_speed}MPH</div>
                        <div class="Humidity">Humidity: ${day.humidity}%</div>
                    </div>`
                        } else {
                            cityFutureForecast.innerHTML = ``
                        }

                    })
                    cityFutureForecast.innerHTML = futureForecast;
                })






        });
});

// local storage for the searched city