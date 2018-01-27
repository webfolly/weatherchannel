import React from 'react';
function DailyItem(props) {
    const day = props.days;
    return (
        <div>
            <span> {day.weekday} </span>
            <span> <img src={day.icon} alt="weather_icon"/></span>
            <span> {day.high} </span>
            <span> {day.low} </span>
        </div>
    );
}

export default function Forecast(props){
    return props.days.map((item,index) => <DailyItem key={index} days={item}/>);
}