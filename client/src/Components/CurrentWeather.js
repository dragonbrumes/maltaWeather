import React from 'react';
import moment from 'moment'


const CurrentWeather = ({ ...props, onClick }) => {

    const { temp, icon, description, units } = props
    const unit = units === "metric" ? "C" : "F"
    const timeFormated = moment().format('LT')
    const dateFormated = moment().format('ddd MMM. D')
    return (
        <div className="current-conditionBox">
            <div className="current-sky">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon" className="current-icon" />
                <div className="current-description">{description}</div>
            </div>
            <div className="current-temp">{temp}<span className="degree">°</span>
                <span className="unit"><a href="#" onClick={onClick} className="unit-link">{unit}</a></span>
            </div>
            <div className="current-datetime">
                <div className="current-time">{timeFormated}</div>
                <div className="current-date">{dateFormated}</div>
            </div>
        </div>
    )

}

export default CurrentWeather