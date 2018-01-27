import React from 'react';
export default function CityConditions(props){
    return(
        <div>
           <div id="location">{props.condition.city}</div>
           <div id="weather">{props.condition.weather}</div>
           <div id="temperature">{props.condition.temp}</div>
           <div id="desc">{props.condition.desc}</div>
        </div>
    );
}