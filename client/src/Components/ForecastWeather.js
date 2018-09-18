import React from 'react';
import moment from 'moment'

const ForecastWeather = ({ forecast, units, onClick }) => {

    const unit = units === "metric" ? "C" : "F"
    moment.locale()

    const show =
        forecast[0].map((element, key) => {
            // day format, only the day, no hours
            const day = moment(element.dt_txt).format('LL')

            return (
                <div key={element.main.temp} className="forecast-conditionBox" >
                    <div className="weather-sky" >{day}</div>
                    <img src={`http://openweathermap.org/img/w/${element.weather[0].icon}.png`} width="100" heigth="100" alt="icon" />
                    <div className="weather-sky" > {element.weather[0].description}</div>
                    <div className="">{element.main.temp}<span className="unit">° <a href="#" onClick={onClick} className="unit-link"> {unit}</a></span></div>
                </div >
            )
        })


    return (
        <div className="forecast-wrapper">
            {show}
        </div>
    )

}

export default ForecastWeather