import React, { Component } from 'react';
import axios from "axios";
import _ from "lodash"
import moment from 'moment';

import CurrentWeather from '../Components/CurrentWeather'
import ForecastWeather from '../Components/ForecastWeather'

class Home extends Component {

    state = ({
        units: 'metric',
        temp: null,
        humidity: null,
        main: undefined,
        description: undefined,
        wind: null,
        forecast: undefined,
    })



    fetchWeather = (newUnits = "metric") => {
        //call the current weather API
        const { units } = this.state
        axios.get("http://localhost:8080/api/weather/" + newUnits)
            // axios.get("http://52ebfe0d26d2472aac2bb56f1282a414.testmyurl.ws/api/weather/" + newUnits)
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

    fetchForecast = (newUnits = "metric") => {
        //call the forecast weather api
        const dayFilterResults = []
        axios.get("http://localhost:8080/api/forecast/" + newUnits)
            .then(res => {
                const results = res.data.data.list
                // filtering to select only one day at 12:00
                const dayFilter = results.filter(el => {
                    return _.includes(el.dt_txt, "12:00")
                })
                // stock filtered days to an array
                dayFilterResults.push(dayFilter)
                // insert into the state
                this.setState({
                    forecast: dayFilterResults
                })

            }).catch(err => {
                console.log(err)
            })

        // console.log(dayFilterResults)
    }


    componentDidMount() {

        this.fetchWeather()
        this.fetchForecast()


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
        this.fetchForecast(newUnits)
    }




    render() {
        const { date, units, forecast } = this.state

        // forecast is empty at first call so checking if none null
        // iterates elements

        // if (forecast !== undefined) {
        //     // console.log(forecast[0])
        //     forecast[0].forEach((element, key) => {
        //         return console.log(element.main.temp, element.weather[0].description)
        //         // return <ForecastWeather temp={element.main.temp} desc={element.weather[0].description} />
        //     })
        // } // and if if

        return (
            <div className="weather" >
                <div className="weather-header">
                    <h2>Current weather</h2>
                    <div className="weather-date">{date}</div>
                </div>
                <CurrentWeather {...this.state} onClick={this.handleClick} />
                {forecast !== undefined && <ForecastWeather forecast={forecast} units={units} onClick={this.handleClick} />}

            </div>

        );
    }
}

export default Home;
