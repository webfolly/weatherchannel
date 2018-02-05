import React from 'react';
import CityConditions from './CityConditions';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import ScaleToggle from './ScaleToggle';
import PeriodToggle from './PeriodToggle';
import fetchWeatherData from './api/weather';
import axios from 'axios';

export default class WeatherChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: {},
            days: [],
            city:this.props.defaultCity,
            scale:'Celsius',
            period:'3'
        }
        this.handleWeatherData = this.handleWeatherData.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConditonData = this.handleConditonData.bind(this);
    }
    handleWeatherData(condition,days) {
        if(condition.city && days.length) {
            this.setState({condition,days});
        }
    }
    handleConditonData(condition) {
        this.setState({condition});
    }
    handleValueChange(name,value) {
        this.setState({[name]:value});
    }
    handleSubmit(value) {
        if(value) {
            fetchWeatherData(this.state.city)
                .then(axios.spread((conditionData,forecastData) => this.handleWeatherData(conditionData,forecastData)))
                .catch(e => console.log(e));
        } 
    }
    componentDidMount() {
        fetchWeatherData(this.state.city)
            .then(axios.spread((conditionData,forecastData) => this.handleWeatherData(conditionData,forecastData)))
            .catch(e => console.log(e)); 
        /*fetchConditionData(this.state.city)
            .then( result => this.handleConditonData(result));*/
        }
        
    render() {
        return(
            <main>
                <nav>
                    <SearchBar value={this.state.city} onChange={this.handleValueChange} onSubmit={this.handleSubmit}/>
                    <ScaleToggle scale={this.state.scale} onChange={this.handleValueChange}/>
                    <PeriodToggle onChange={this.handleValueChange} period={this.state.period}/>
                </nav>
                <section id="left">
                    <CityConditions condition={this.state.condition} scale={this.state.scale} />
                </section>
                <section id="right">
                    <Forecast days={this.state.days} scale={this.state.scale} period={this.state.period} />
                </section>
            </main>
        );
    }
}
