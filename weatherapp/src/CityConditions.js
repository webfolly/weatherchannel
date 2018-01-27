import React from 'react';
export default function CityConditions(props){
    return(
        <div>
           <div id="location">{props.condition.city}</div>
           <div id="weather">{props.condition.weather}</div>
           <div id="temperature"> {props.scale === "Celsius"  ?  props.condition.temp_c : props.condition.temp_f}</div>
           <div id="desc">{props.condition.desc}</div>
        </div>
    );
}