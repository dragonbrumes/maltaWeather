import React, { Component } from 'react';
import axios from "axios";


class Weather extends Component {

    state = ({
        temp: null
    })

    componentDidMount() {
        axios.get("http://localhost:8080/api/weather")
            .then(res => {
                console.log(res.data.data.main.temp)
                const { temp } = res.data.data.main

                this.setState({
                    temp
                })
            })
    }

    render() {
        const { temp } = this.state
        return (
            <div className="weather">
                <h1>Weather in Valetta</h1>
                <div className="weather-temp">Currently the temp is {temp} Celcius</div>
            </div>

        );
    }
}

export default Weather;
