import React from 'react';

const CurrentWeather = ({ ...props, onClick }) => {
    const { temp, icon, description, units } = props
    const unit = units === "metric" ? "C" : "F"
    return (
        <div className="weather-conditionBox">
            <img src={`http://openweathermap.org/img/w/${icon}.png`} width="100" heigth="100" alt="icon" />
            <div className="weather-sky">{description}</div>
            <div className="">{temp}<span className="unit">° <a href="#" onClick={onClick}> {unit}</a></span></div>
        </div>
    )

}

export default CurrentWeather