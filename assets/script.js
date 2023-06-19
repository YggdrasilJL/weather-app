const apiKey = 'b329df0af2f27dbc7b382270d5a27148'
//let lat;
//let long;
let combinedCord;
const cityName = 'Halifax'
const apiCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
//const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`

fetch(apiCity).then(function (data) {
    return data.json()
}) .then (function (data) {
    console.log(data)
    console.log(data[0].lat)
    console.log(data[0].lon)
    let lat = data[0].lat
    let long = data[0].lon
    getWeather(lat,long)
}) 
function getWeather(lat, long){
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`
fetch(apiUrl).then(function (data) {
     return data.json()
     }) .then(function (data) {
     console.log(data)
     console.log(data.list[1].main.humidity)
 })
}