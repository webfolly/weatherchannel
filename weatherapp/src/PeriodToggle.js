import React from 'react';

export default function PeriodToggle (props) {
    let period = props.period;
    //console.log(typeof props.period);
    return (
        <form action="#" className="period-toggle">
            <input type="radio" name="period" value={'3'}  onChange={ (e) => props.onChange(e.target.name,e.target.value) } checked={period==="3" ? true:false}/> 3-Day Forecast
            <input type="radio" name="period" value={'5'}  onChange={ (e) => props.onChange(e.target.name,e.target.value) } checked={period==="5" ? true:false}/> 5-Day Forecast
        </form>
    );
}