import React from 'react';
import Header from './Header';
import Footer from './Footer';
import WeatherChannel from './WeatherChannel';

export default class App extends React.Component {
    render() {
        return(
            <div className="root">
                <Header />
                <WeatherChannel defaultCity="brisbane"/>
                <Footer />
            </div>
        );
    }
}

