import React from 'react';

function DailyItem(props) {
    const day = props.days;
    const scale = props.scale;
    return (
        <div>
            <span> {day.weekday} </span>
            <span> <img src={day.icon} alt="weather_icon"/></span>
            <span> {scale === "Celsius" ? day.high_c : day.high_f } </span>
            <span> {scale === "Fahrenheit" ? day.low_c : day.low_f } </span>
        </div>
    );
}
export default function Forecast(props){
    return props.days.map((item,index) => <DailyItem key={index} days={item} scale={props.scale}/>);
}