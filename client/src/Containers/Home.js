import React, { Component } from 'react';
import axios from "axios";

import CurrentWeather from './../Components/CurrentWeather'

import "./weather.styl"

class Home extends Component {

    state = ({
        temp: null,
        humidity: null,
        main: undefined,
        description: undefined,
        wind: null,
        time: new Date().toLocaleString(),
    })

    componentDidMount() {
        axios.get("http://52ebfe0d26d2472aac2bb56f1282a414.testmyurl.ws/api/weather")
            .then(res => {
                console.log(res.data.data)
                const { temp, humidity } = res.data.data.main
                const { icon, main, description } = res.data.data.weather["0"]
                const { speed } = res.data.data.wind

                this.setState({
                    temp,
                    humidity,
                    icon,
                    main,
                    description,
                    wind: speed
                })
            })
    }



    render() {
        const { time } = this.state
        return (
            <div className="weather">
                <div className="weather-header">
                    <h2>Current weather</h2>
                    <div className="weather-date">{time}</div>
                </div>
                <CurrentWeather {...this.state} />
            </div>

        );
    }
}

export default Home;
