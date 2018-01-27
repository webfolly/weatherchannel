import React from 'react';
import CityConditions from './CityConditions';
import Forecast from './Forecast';
import SearchBar from './SearchBar';
import { fetchConditionData, fetchForecatData } from './api/weahter';

export default class WeatherChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: {},
            days: [],
            value:this.props.defaultCity
        }
        this.handleConditionData = this.handleConditionData.bind(this);
        this.handleForecastData = this.handleForecastData.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleConditionData(data) {
       this.setState({condition:data});
    }
    handleForecastData(data) {
        this.setState({days:data});
    }
    onValueChange(value) {
        this.setState({value:value});
    }
    onSubmit(value) {
        if(value) {
            fetchConditionData(value,this.handleConditionData);
            fetchForecatData(value,this.handleForecastData); 
        }
    }
    componentDidMount() {
        fetchConditionData(this.state.value,this.handleConditionData);
        fetchForecatData(this.state.value,this.handleForecastData);
    }
    render() {
        return(
            <main>
                <SearchBar value={this.state.value} onValueChange={this.onValueChange} onSubmit={this.onSubmit}/>
                <section id="left">
                    <CityConditions condition={this.state.condition}/>
                </section>
                <section id="right">
                    <Forecast days={this.state.days} />
                </section>
            </main>
        );
    }
}
