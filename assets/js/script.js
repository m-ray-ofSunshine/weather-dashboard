var apiKey = "fd1f2ef3b4987995a3d25c966c0dded0"


$("form").submit(citySearch)

function getCityDate(unix) {
    var a = new Date(unix * 1000);
    var cityDate = " ("+(a.getMonth()+1)+"-"+a.getDate()+"-"+a.getFullYear()+") ";
    return cityDate;
}

function getIconImage (iconCode) {
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var image = $("<img>")
    image.attr("src", iconUrl);
    return image;
}


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
             
             var temperature = $("<p>").text("Temp: " + data.main.temp + " F\u00B0")
             var windSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + "mph")
             var humidity = $("<p>").text("Humidity: " + data.main.humidity + "%")
             var currentWeather = $("#currentWeather")
             var image = getIconImage(data.weather[0].icon)
             var cityDate = getCityDate(data.dt)
             cityName[0].innerHTML= data.name + cityDate 
             cityName.append(image)
             currentWeather.append(cityName)
             currentWeather.append(temperature)
             currentWeather.append(windSpeed)
             currentWeather.append(humidity)
             console.log(data)

         })
         fetch (apiUrl5DayForcast)
         .then(function (response){
             return response.json();
         })
         .then(function(data) {
             var fiveDayCard = $("#fiveDayCard")
             var fiveDayTitle = $("#fiveDayTitle").text("5-Day Forecast")
             fiveDayCard.append(fiveDayTitle);
             for(var i=0; i < data.list.length; i+=8){
                 
                 var container = $("#fiveDay");
                 var day = $("<div>").attr("class", "col-2");
                 var date = $("<h4>").text(getCityDate(data.list[i].dt));
                 var image = getIconImage(data.list[i].weather[0].icon)
                 var temp = $("<p>").text("Temp: " + data.list[i].main.temp + " F\u00B0");
                 var wind =$("<p>").text("Wind: " + data.list[i].wind.speed + "mph")
                 var humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%")
                 day.append(date);
                 day.append(image);
                 day.append(temp);
                 day.append(wind);
                 day.append(humidity);
                 container.append(day);
                }
                console.log(data);
         })
 }