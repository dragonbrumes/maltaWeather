import React from 'react';

const ForecastWeather = ({ forecast, units, onClick }) => {
    // const { temp, icon, description, units } = props
    const unit = units === "metric" ? "C" : "F"
    const show =
        forecast[0].map((element, key) => {
            console.log(element)
            return (
                <div key={element.main.temp} className="forecast-conditionBox" >
                    <div className="weather-sky" > {element.dt_txt}</div>
                    <img src={`http://openweathermap.org/img/w/${element.weather[0].icon}.png`} width="100" heigth="100" alt="icon" />
                    <div className="weather-sky" > {element.weather[0].description}</div>
                    <div className="">{element.main.temp}<span className="unit">° <a href="#" onClick={onClick}> {unit}</a></span></div>
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