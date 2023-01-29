const cityInput = document.querySelector('#cityInput'),
searchBtn = document.querySelector('#searchBtn');

const weatherWrapper = document.querySelector('.wrapper'),
errMessage = document.querySelector('.errMessage'),
successMessage = document.querySelector('.successMessage'),
wDetails = document.querySelector('.content__weather'),
wMoreInfo = document.querySelector('.more-weather-info');

const locationEntered = document.querySelector('.locationEntered'),
temperature = document.querySelector('.temp .temp-value'),
weather = document.querySelector('.temp .weather-description'),
imgWeather = document.querySelector('.weather-details img'),
feelsLikeVal = document.querySelector('.fl-value'),
humidityVal = document.querySelector('.humidity-value');

const apiID = '26f2f439af0a916c44cadef9a92aad65';

cityInput.addEventListener('keyup', e => {
    if(e.key === 'Enter' && cityInput.value != ""){
        requestApi(cityInput.value);
    }
});

searchBtn.addEventListener('click', () =>{
    if(cityInput.value != ""){
        requestApi(cityInput.value);
    }
});

function requestApi(city){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;
    fetch(api).then(response => {
        return response.json();
    }).then(result => { weatherDetails(result); })
    .catch(err => console.log(err));
}

function weatherDetails(result){
    
    // if the city entered is not valid
    if(result.cod == "404"){
        errMessage.style.display = 'block';
        errMessage.innerHTML = `${cityInput.value} isn't a valid city name`;
        wDetails.style.display = 'none';
        wMoreInfo.style.display = 'none';
    } 
    else{
        errMessage.innerHTML = "";
        errMessage.style.display = 'none';
        wDetails.style.display = 'flex';
        wMoreInfo.style.display = 'flex';
        // get values from the object
        const {feels_like, humidity, temp} = result.main;
        const {description, id} = result.weather[0];
        if(id == 800){
            imgWeather.src = `images/clear.svg`;
            console.log(id);
        } else if(id >= 200 && id <= 232){
            imgWeather.src = 'images/storm.svg';
            console.log(id);
        } else if(id >= 600 && id <= 622){
            imgWeather.src = 'images/snow.svg';
            console.log(id);
        } else if(id >= 701 && id <= 781){
            imgWeather.src = 'images/haze.svg';
            console.log(id);
        } else if(id >= 801 && id <= 804){
            imgWeather.src = 'images/cloud.svg';
            console.log(id);
        } else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
            imgWeather.src = 'images/rain.svg';
            console.log(id);
        }

        locationEntered.innerHTML = `${result.name}, ${result.sys.country}`;
        
        temperature.innerHTML = Math.floor(temp);
        weather.innerHTML = description;
        weather.style.textTransform = 'capitalize';
        
        feelsLikeVal.innerHTML = Math.floor(feels_like);
        humidityVal.innerHTML = humidity;
    }

    cityInput.value = "";
}



