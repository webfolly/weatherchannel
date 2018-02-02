import React from 'react';

export default function ScaleToggle(props) {
    const scale = props.scale;
    return (
        <form action="#" className="scale-toggle">
            <input type = "radio" name = "scale" value = "Celsius" onChange={ (e) => props.onChange(e.target.name,e.target.value) } checked={scale==='Celsius'?true:false} /> Celsius
            <input type = "radio" name = "scale" value = "Fahrenheit" onChange={ (e) => props.onChange(e.target.name,e.target.value) } checked={scale==='Fahrenheit'?true:false} /> Fahrenheit
        </form>
    );
}
