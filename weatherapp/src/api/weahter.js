const CONDITION_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/';
const FORECAST_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/';
const conditionXHR = new XMLHttpRequest();
const forecastXHR = new XMLHttpRequest();
let alertCounter = 0;
export function fetchConditionData(city,onHandleConditionData){
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
function conditionDataFormat(respData) {
    let conditionData = {};
    conditionData.city = respData.current_observation.display_location.city;
    conditionData.weather = respData.current_observation.weather;
    conditionData.temp_c = respData.current_observation.temp_c;
    conditionData.temp_f = respData.current_observation.temp_f;
    conditionData.desc = respData.forecast.txt_forecast.forecastday[0].fcttext_metric; 
    return conditionData;
}
function forecastDataFormat(respData) {
    let forecastData = [];
    let tmp = respData.forecast.simpleforecast.forecastday.filter((item,index) => index%2===0 ).slice(0,5);
    for(let i=0;i<tmp.length;i++) {
        forecastData[i] = {weekday:tmp[i].date.weekday,high_c:tmp[i].high.celsius, low_c:tmp[i].low.celsius,high_f:tmp[i].high.fahrenheit,low_f:tmp[i].low.fahrenheit,icon:tmp[i].icon_url} ;
    }
    return forecastData;
}