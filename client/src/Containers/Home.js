import React, { Component } from 'react';
import axios from "axios";

import CurrentWeather from '../Components/CurrentWeather'

class Home extends Component {

    state = ({
        units: 'metric',
        temp: null,
        humidity: null,
        main: undefined,
        description: undefined,
        wind: null,
        date: new Date().toLocaleString(),
    })

    fetchWeather = (newUnits = "metric") => {
        //call the current weather API
        const { units } = this.state
        // axios.get("http://52ebfe0d26d2472aac2bb56f1282a414.testmyurl.ws/api/weather")
        axios.get("http://localhost:8080/api/weather/" + newUnits)
            .then(res => {
                // console.log(res.data.data)
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



    componentDidMount() {
        this.fetchWeather()
        // call the forecast weather api    
        // axios.get("http://localhost:8080/api/forecast")
        //     .then(res => {
        //         console.log(res.data)
        //         // const { temp, humidity } = res.data.data.main
        //         // const { icon, main, description } = res.data.data.weather["0"]
        //         // const { speed } = res.data.data.wind

        //         // this.setState({
        //         //     temp,
        //         //     humidity,
        //         //     icon,
        //         //     main,
        //         //     description,
        //         //     wind: speed
        //         // })
        //     }).catch(err => {
        //         console.log(err)
        //     })
    }

    handleClick = () => {
        // change the unit value (Celsius /Fahrenheit )
        const { units } = this.state
        const newUnits = units === "metric" ? "imperial" : "metric"
        this.setState({
            units: newUnits
        })
        // re fetch the data
        this.fetchWeather(newUnits)
    }

    render() {
        const { date } = this.state
        return (
            <div className="weather">
                <div className="weather-header">
                    <h2>Current weather</h2>
                    <div className="weather-date">{date}</div>
                </div>
                <CurrentWeather {...this.state} onClick={this.handleClick} />
            </div>

        );
    }
}

export default Home;
