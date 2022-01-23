// created variables for the DOM elements
var searchButtonEl = document.getElementById('search-button');
var resultCityEl = document.getElementById('result-city');
var cityList = document.getElementById('city-list');
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

showUserCityButton(); 

// created function to get the city weather information 
function getCityInfo() {
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
            forecastHeading.textContent = "5-Day Forecast:";


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
                    var uvIndexVal = data.daily[0].uvi;
                    uvIndex.textContent = "UV Index: " + uvIndexVal;
                    // create if statements for the differen uvi range color backgrounds
                    if (uvIndexVal <= 2) {
                        uvIndex.classList.add("uvIndex", "uvIndexLow");
                    } if (uvIndexVal >= 3, uvIndexVal <= 5) {
                        uvIndex.classList.add("uvIndex", "uvIndexModerate");
                    } if (uvIndexVal >= 6, uvIndexVal <= 7) {
                        uvIndex.classList.add("uvIndex", "uvIndexHigh");
                    } if (uvIndexVal >= 8, uvIndexVal <= 10) {
                        uvIndex.classList.add("uvIndex", "uvIndexVeryHigh");
                    } if (uvIndexVal >= 11) {
                        uvIndex.classList.add("uvIndex", "uvIndexExtreme");
                    }

                    // setting values for the coming 5-day future forecast
                    let futureForecast = '';
                    data.daily.forEach((day, idx) => {
                        if (idx == 0) {
                            cityFutureForecast.innerHTML = ``
                        } else if (idx < 6) {
                            futureForecast += ` <div class="weather-forecast-item">
                        <div class="day">${window.moment(day.dt * 1000).format('L')}</div>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                        <div class="temp">Temp: ${Math.round(day.temp.night)}&#176; C</div>
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
}

var userCityVal = [];

function saveUserCity() {
    // save the user input city to local storage
    localStorage.setItem('city', JSON.stringify(userCity.value));
}

function getUserCity() {
    // get the user input city from local storage
    var storedCity = JSON.parse(localStorage.getItem('city'));

    if (storedCity !== null) {
        userCityVal = storedCity;
    }
    showUserCityButton();
}

function showUserCityButton() {
    // show the city name in a button
    cityList.innerHTML = "";

    for (var i = 0; i < userCityVal.length; i++) {
        var userCityInput = userCityVal[i];

        // list the button (?) i want it one on top of the other
        var button = document.createElement("button");
        button.textContent = userCityInput;
        button.setAttribute("data-index", i);

        cityList.appendChild(button);
    }
}

function cityButtonShowInfo() {
    // click the button it wil show the information again
}

// created a click evetn function for the search button
searchButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    getCityInfo();

    saveUserCity();
    getUserCity()
    showUserCityButton();
    

    if (!userCity.value) {
        alert('Please enter a valid city name!')
        return;
    }

});

