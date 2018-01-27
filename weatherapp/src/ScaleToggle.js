import React from 'react';

export default class ScaleToggle extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.props.onScaleChange(event.target.value)
    }
    render() {
        const scale = this.props.scale;
        return (
        <form action="#" className="scale-toggle">
        <input type = "radio" name = "scale" value = "Celsius" onChange={this.handleChange} checked={scale==='Celsius'?true:false} /> Celsius
        <input type = "radio" name = "scale" value = "Fahrenheit" onChange={this.handleChange} checked={scale==='Fahrenheit'?true:false} /> Fahrenheit
        </form>
        );
    }

}
