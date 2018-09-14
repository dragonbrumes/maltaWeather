import React, { Component } from 'react';
import axios from "axios";
import _ from "lodash"
import moment from 'moment';

import CurrentWeather from '../Components/CurrentWeather'

class Home extends Component {

    state = ({
        units: 'metric',
        temp: null,
        humidity: null,
        main: undefined,
        description: undefined,
        wind: null,
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

    fetchForecast = () => {
        //call the forecast weather api
        const dayResults = []
        axios.get("http://localhost:8080/api/forecast")
            .then(res => {
                const results = res.data.data.list
                // console.log(res.data.data.list)

                results.forEach((element, key) => {

                    const dayFinder = Object.keys(element).filter(function (key) {
                        // console.log(element[key])
                        // return _.includes(element[key], "12:00:00")

                        return (_.includes(element[key], "12:00:00"))
                        // return element[key] == dayHolder + ' ' + '12:00:00'
                    }) // Object.keys
                    // console.log(dayFinder)
                    console.log(element[dayFinder], key)

                    // console.log(Object.keys(element)
                    //     .filter((key) => element[key] === "12:00:00")
                    // )

                    // console.log(Object.keys(element)
                    //     .includes((key) => element[key] === " 12:00:00")
                    // )

                    // const dayFinder2 = _.includes(element.dt_txt, "12:00:00")
                    // console.log(element.dt_txt.slice(10))
                    // console.log(dayFinder2)

                    // console.log(element.dt_txt.slice(10) === _.includes(element.dt_txt, "12:00:00") ? element : "nope")
                    // console.log(_.filter(element, )        (s => s.includes('12:00'))      )

                }) // forEach


            }).catch(err => {
                console.log(err)
            })
        // console.log(dayResults)
    }


    componentDidMount() {

        // test filter + includes
        // const items = ['item 1', 'thing', 'id-3-text', 'class'];
        // const matches = items.filter(key => key.includes('thi'));
        // console.log(matches)

        // this.fetchWeather()
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
