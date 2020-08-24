$(document).ready(function(){

    let DefaultCity = 'Mowe';
    updateCityWeather(DefaultCity);
    
    $(document).on('click', '#submit-btn', function(e) {
        e.preventDefault()
        
        if($('#city-name').val() == ""){
            $('#error-message').text("YOU MUST ENTER A CITY").show();
            return
        }

        updateCityWeather($('#city-name').val());
    })


    function updateCityWeather(city){

        $.ajax({
            url: '/weather_location_data',
            data: {cityName: city}
        })
        .then(response => {            

            if(response.cod == '404'){
                $('#error-message').text("CITY NOT FOUND. PLEASE CROSSCHECK YOUR INPUT").show();
                return
            }

            $('#error-message').hide();

            let cityValue = response.name;
            let countryValue = response.sys.country;
            let tempValue = response.main.temp
            let descValue = response.weather[0].description
            let iconCode = response.weather[0].icon
            let iconurl = `http://openweathermap.org/img/w/${iconCode}.png`
            let cityTimeStamp = parseInt(response.dt)
            let cityTimeZone = parseInt(response.timezone)
            let latitude = response.coord.lat
            let longitude = response.coord.lon
            let windSpeed = response.wind.speed       

            $('#location').text(`${cityValue}, ${countryValue}`)
            $('#weather-desc').text(descValue.toUpperCase());
            $('#weather-icon').attr('src', iconurl)
            $('#temp').text(`${tempValue}°c`);
            $('#latitude').text(latitude)
            $('#longitude').text(longitude)
            $('#wind-speed').text(`${windSpeed}km/h`)
            $('#time-city').text(`${cityValue} Time`)
            startLocalTime(cityTimeZone) 
            document.body.style.backgroundImage = `url(${getRandomImage()})`;
            

        })

    }

})