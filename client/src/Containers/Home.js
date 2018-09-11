import React, { Component } from 'react';
import axios from "axios";

import "./weather.styl"

class Home extends Component {

    state = ({
        temp: null,
        humidity: null,
        main: undefined,
        description: undefined,
        wind: null
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
        const { temp, humidity, icon, main, description, wind } = this.state
        return (
            <div className="weather">
                <h2>Current weather</h2>
                <div className="weather-conditionBox">
                    <img src={`http://openweathermap.org/img/w/${icon}.png`} width="100" heigth="100" alt="icon" />
                    <div className="weather-sky">{description}</div>
                    <div className="">{temp}° <span className="unit">Celcius</span></div>
                </div>
            </div>

        );
    }
}

export default Home;
