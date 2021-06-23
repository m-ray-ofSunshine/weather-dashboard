var apiKey = "fd1f2ef3b4987995a3d25c966c0dded0"


$("form").submit(citySearch)

function citySearch(e) {
    e.preventDefault();
    var city =$("#city").val();
    var apiUrlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    var apiUrl5DayForcast = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey
     fetch (apiUrlCurrent)
         .then(function (response){
             return response.json();
         })
         .then(function(data) {
             var cityName = $("#cityName")
             //var temperature = $("<p>");
             var temperature = $("<p>").text("Temp: " + data.main.temp + " F\u00B0")
             var windSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + "mph")
             var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%")
             var currentWeather = $("#currentWeather")
             var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
             var image = $("<img>")
             image.attr("src", iconUrl);
             var a = new Date(data.dt * 1000);
             var cityDate = " ("+(a.getMonth()+1)+"-"+a.getDate()+"-"+a.getFullYear()+") ";
             cityName[0].innerHTML= data.name + cityDate 
             cityName.append(image)
             currentWeather.append(cityName)
             currentWeather.append(temperature)
             currentWeather.append(windSpeed)
             currentWeather.append(humidity)
             //console.log(data)

         })
         fetch (apiUrl5DayForcast)
         .then(function (response){
             return response.json();
         })
         .then(function(data) {
             console.log(data);
         })
 }