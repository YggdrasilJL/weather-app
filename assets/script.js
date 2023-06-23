document.addEventListener('DOMContentLoaded', function() {
    let lat;
    let long;
    const units = 'metric';
    const fiveDayApiKey = 'b329df0af2f27dbc7b382270d5a27148';
    const currentApiKey = '9d32354642ac60ce4e2f1c9a0362d695';
    let cityName = 'Fredericton';
    const apiCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${fiveDayApiKey}`;
  
    fetch(apiCity)
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        console.log(data);
        console.log(data[0].lat);
        console.log(data[0].lon);
        lat = data[0].lat;
        long = data[0].lon;
        getWeather(lat, long);
      });
  
    function getWeather(lat, long) {
      const fiveDayApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${fiveDayApiKey}`;
      const currentApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${currentApiKey}`;
  console.log(fiveDayApiUrl)
      fetch(fiveDayApiUrl)
        .then(function(data) {
          return data.json();
        })
        .then(function(data) {
          console.log(data);
          console.log(data.list[1].main.humidity);
          let tempContain = document.querySelectorAll('.temp');
  
          tempContain.forEach(element => {
            let temp = document.createElement('p');
            temp.textContent = data.list[1].main.temp + 'C';
            element.append(temp);
          });
  
          let humidContain = document.querySelectorAll('.humid');
  
          humidContain.forEach(element => {
            let humid = document.createElement('p');
            humid.textContent = data.list[1].main.humidity;
            element.append(humid);
          });
  
          let windContain = document.querySelectorAll('.wind-speed');
  
          windContain.forEach(element => {
            let windSpeed = document.createElement('p');
            windSpeed.textContent = data.list[1].wind.speed;
            element.append(windSpeed);
          });
          
  
          timeStamp1 = dayjs(data.list[0].dt_txt).format('YYYY/MM/DD');
          timeStamp2 = dayjs(data.list[1].dt_txt).format('YYYY/MM/DD');
          timeStamp3 = dayjs(data.list[2].dt_txt).format('YYYY/MM/DD');
          timeStamp4 = dayjs(data.list[18].dt_txt).format('YYYY/MM/DD');
          timeStamp5 = dayjs(data.list[31].dt_txt).format('YYYY/MM/DD');
  
          document.querySelector('.date1').textContent = timeStamp1;
          document.querySelector('.date2').textContent = timeStamp2;
          document.querySelector('.date3').textContent = timeStamp3;
          document.querySelector('.date4').textContent = timeStamp4;
          document.querySelector('.date5').textContent = timeStamp5;
        });
  
      fetch(currentApi)
        .then(function(data) {
          return data.json();
        })
        .then(function(data) {
          console.log(data);
          document.querySelector('.current-temp').textContent =
            'Temp: ' + data.main.temp + ' C';
          document.querySelector('.current-humid').textContent =
            'Humidity: ' + data.main.humidity + '%';
          document.querySelector('.current-wind-speed').textContent =
            'Wind Speed: ' + data.wind.speed + ' kmph';
        });
    }
  });
  