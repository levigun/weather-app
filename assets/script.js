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