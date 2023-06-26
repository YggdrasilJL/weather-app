document.addEventListener('DOMContentLoaded', () => {
  const fiveDayApiKey = 'b329df0af2f27dbc7b382270d5a27148'
  const currentApiKey = '9d32354642ac60ce4e2f1c9a0362d695'
  const units = 'metric'
  const cityName = 'Fredericton'

  const searchInput = document.querySelector('.form-control')
  const searchHistory = document.querySelector('.search-history')
  const searchHistoryList = []
  searchInput.textContent = ''

  if (localStorage.getItem('searchHistoryList')) {
    const storedSearchHistory = JSON.parse(localStorage.getItem('searchHistoryList'))
    searchHistoryList.push(...storedSearchHistory)
    displaySearchHistory()
  }

  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const cityName = event.target.value
      getCityCoordinates(cityName)
      addSearchHistory(cityName)

    }
  })

  searchHistory.addEventListener('click', event => {
    const cityName = event.target.textContent.trim()
    if (cityName) {
      getCityCoordinates(cityName)
    }
  })

  const apiCity = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + fiveDayApiKey

  fetch(apiCity)
    .then(data => {
      return data.json()
    })
    .then(data => {
      const lat = data[0].lat
      const long = data[0].lon
      getWeather(lat, long)
    })

  function getCityCoordinates(cityName) {
    const apiCity = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${fiveDayApiKey}`

    fetch(apiCity)
      .then(data => {
        return data.json()
      })
      .then(data => {
        const lat = data[0].lat
        const long = data[0].lon
        getWeather(lat, long)
      })
  }

  function getWeather(lat, long) {
    const fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${fiveDayApiKey}`
    const currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${currentApiKey}`

    fetch(fiveDayApiUrl)
      .then(data => {
        return data.json()
      })
      .then(data => {
        const fiveForecastList = data.list

        const currentCard = document.querySelector('.col-12.col-md-6 .card')
        const currentTemp = currentCard.querySelector('.current-temp')
        const currentHumidity = currentCard.querySelector('.current-humid')
        const currentWindSpeed = currentCard.querySelector('.current-wind-speed')
        currentTemp.textContent = 'Temperature: ' + fiveForecastList[0].main.temp + '°C'
        currentHumidity.textContent = 'Humidity: ' + fiveForecastList[0].main.humidity + '%'
        currentWindSpeed.textContent = 'Wind Speed: ' + fiveForecastList[0].wind.speed + ' km/h'

        const fiveForecastCards = document.querySelectorAll('.col-12.col-md-2 .card')
        for (let i = 0; i < fiveForecastCards.length; i++) {
          const fiveForecastCard = fiveForecastCards[i]
          const fiveForecastEntry = fiveForecastList[i * 8]

          const fiveForecastTitle = fiveForecastCard.querySelector('.card-title')
          const fiveForecastImg = fiveForecastCard.querySelector('.card-img')
          const fiveForecastTemp = fiveForecastCard.querySelector('.temp')
          const fiveForecastHumidity = fiveForecastCard.querySelector('.humid')
          const fiveForecastWindSpeed = fiveForecastCard.querySelector('.wind-speed')
          fiveForecastTitle.textContent = dayjs(fiveForecastEntry.dt_txt).format('MMM DD')
          fiveForecastImg.src = 'https://openweathermap.org/img/wn/' + fiveForecastEntry.weather[0].icon + '.png'
          fiveForecastTemp.textContent = 'Temp: ' + fiveForecastEntry.main.temp + ' °C'
          fiveForecastHumidity.textContent = 'Humidity: ' + fiveForecastEntry.main.humidity + '%'
          fiveForecastWindSpeed.textContent = 'Wind Speed: ' + fiveForecastEntry.wind.speed + ' km/h'
        }
      })

    fetch(currentApi)
      .then(data => {
        return data.json()
      })
      .then(data => {
        const currentCard = document.querySelector('.col-12.col-md-6 .card')
        const currentImg = currentCard.querySelector('.card-img-top')
        const weatherImg = data.weather[0].icon
        currentImg.src = `https://openweathermap.org/img/wn/${weatherImg}.png`
      })
  }

  function addSearchHistory(city) {
    if (!searchHistoryList.includes(city)) {
      searchHistoryList.push(city);
      localStorage.setItem('searchHistoryList', JSON.stringify(searchHistoryList))
      displaySearchHistory()
    }
    
  }
  

  function displaySearchHistory() {
    searchHistory.textContent = ''
     const clearSearch = document.getElementById('clearBtn')
    searchHistoryList.forEach(city => {
     const list = document.createElement('button')
      list.textContent = city.charAt(0).toUpperCase() + city.slice(1)
      searchHistory.classList.add('ul-style-history')
      searchHistory.appendChild(list)
    })
    clearSearch.addEventListener('click', () => {
      
    })
  }
})
