import React from 'react';
import CityConditions from './CityConditions';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import ScaleToggle from './ScaleToggle';
import PeriodToggle from './PeriodToggle';
import { fetchConditionData, fetchForecatData } from './api/weather';

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
        this.handleConditionData = this.handleConditionData.bind(this);
        this.handleForecastData = this.handleForecastData.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleConditionData(data) {
        this.setState({condition:data});
    }
    handleForecastData(data) {
        this.setState({days:data});
    }
    handleValueChange(name,value) {
        switch(name) {
            case 'period':
                this.setState({period:value});
                break;
            case 'searchBar':
                this.setState({city:value});
                break;
            case 'scale':
                this.setState({scale:value});
                break;
            default:
                break;
        }
    }
    handleSubmit(value) {
        if(value) {
            fetchConditionData(value,this.handleConditionData);
            fetchForecatData(value,this.handleForecastData); 
        }
    }
    componentDidMount() {
        fetchConditionData(this.state.city,this.handleConditionData);
        fetchForecatData(this.state.city,this.handleForecastData);
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
