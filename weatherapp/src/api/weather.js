import axios from 'axios'; 

const CONDITION_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/';
const FORECAST_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';

/* ==========================  use XMLHttpRequest method to fecth data ==================================================
const conditionXHR = new XMLHttpRequest();
const forecastXHR = new XMLHttpRequest();
export function fetchConditionData(city){
    conditionXHR.open('GET',`${CONDITION_BASE_URL}${city}.json`)
    conditionXHR.onload = () => {
        if (conditionXHR.status === 200) {
            const respData = JSON.parse(conditionXHR.responseText);
            if(respData.response.error) {
                if(alertCounter<1) {
                    alert(respData.response.error.description);
                    alertCounter++;
                } else {
                    alertCounter = 0;
                }
            } else if(respData.forecast) {
                try {
                    var conditionData = conditionDataFormat(respData); 
                    onHandleConditionData(conditionData);
                }
                catch(e) {
                    alert(e);
                }
            } 
        } else {
            alert('Fail to load weahter conditions');
        }
    }
    conditionXHR.send();
}
export function fetchForecatData(city,onHandleForecastData){
    forecastXHR.open('GET',`${FORECAST_BASE_URL}${city}.json`);
    forecastXHR.onload = () => {
        if (forecastXHR.status === 200) {
            const respData = JSON.parse(forecastXHR.responseText);
            if(respData.response.error) {
                if(alertCounter<1){
                    alert(respData.response.error.description);
                    alertCounter++;
                } else {
                    alertCounter = 0;
                }
            } else if (respData.forecast){
                try {
                    var forecastData = forecastDataFormat(respData);
                    onHandleForecastData(forecastData);
                } catch(e) {
                    alert(e);
                }
            } else {
                alert('the city not found');
            }
        } else {
            alert('Fail to load weahter forecast');
        }
    }
    forecastXHR.send();
}
========================================================================================================================*/
let alertCounter = 0;
function conditionDataFormat(respData) {
    let conditionData = {};
    if(respData.response.error) {
        if(alertCounter<1){
            alert(respData.response.error.description);
            alertCounter++;
        } else {
            alertCounter = 0;
        }
    } else if (respData.forecast && respData.current_observation){
        conditionData.city = respData.current_observation.display_location.city;
        conditionData.weather = respData.current_observation.weather;
        conditionData.temp_c = respData.current_observation.temp_c;
        conditionData.temp_f = respData.current_observation.temp_f;
        conditionData.desc = respData.forecast.txt_forecast.forecastday[0].fcttext_metric; 
    } else {
        if(alertCounter<1) {
            alert('the city not found');
            alertCounter++;
        }else {
            alertCounter = 0;
        }
    }
    return conditionData;
}

function forecastDataFormat(respData) {
    let forecastData = []; 
    if(respData.response.error) {
        if(alertCounter<1){
            alert(respData.response.error.description);
            alertCounter++;
        } else {
            alertCounter = 0;
        }
    } else if (respData.forecast) {
        let tmp = respData.forecast.simpleforecast.forecastday;
        for(let i=0;i<tmp.length;i++) {
            forecastData[i] = {
                weekday:tmp[i].date.weekday,
                high_c:tmp[i].high.celsius, 
                low_c:tmp[i].low.celsius,
                high_f:tmp[i].high.fahrenheit,
                low_f:tmp[i].low.fahrenheit,
                icon:tmp[i].icon_url
            };
        }
    } else {
        if(alertCounter<1) {
            alert('the city not found');
            alertCounter++;
        }else {
            alertCounter = 0;
        }
    }
    return forecastData;
}
/* ============================  use axios API to fetch data ==========================================================*/ 
function fetchConditionData(city) {
    return axios.get(`${CONDITION_BASE_URL}${city}.json`)
        .then((response) => conditionDataFormat(response.data));
}
function fetchForecatData(city) {
    return axios.get(`${FORECAST_BASE_URL}${city}.json`)
        .then((response) => forecastDataFormat(response.data));
}
export default function fetchWeatherData(city) {
    return axios.all([fetchConditionData(city),fetchForecatData(city)]);
}

/* =========================================use Promise to wrap asynchronous request ==================================== 
let fetch = {
    get:function (url){
        const promise = new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if(xhr.status === 200) {
                    const respData = JSON.parse(xhr.responseText);
                    resolve(respData);
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
            xhr.open('GET',url);
            xhr.send();
        });
    return promise;
    }
};
export function fetchConditionData(city) {
    console.log('now here');
    return fetch.get(`${CONDITION_BASE_URL}${city}.json`)
        .then((response) => conditionDataFormat(response));
}
export function fetchForecatData(city) {
    return fetch.get(`${FORECAST_BASE_URL}${city}.json`)
        .then((response) => forecastDataFormat(response));
}
====================================================================================================================*/