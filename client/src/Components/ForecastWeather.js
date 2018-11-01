import React from 'react';
import moment from 'moment';

const ForecastWeather = ({ forecast, units, onClick }) => {
  const unit = units === 'metric' ? 'C' : 'F';
  moment.locale();

  const show = forecast[0].map((element, key) => {
    // day format, only the day, no hours
    const day = moment(element.dt_txt).format('ddd');
    // reduce the temp to two digits only
    const temp = element.main.temp_max.toString().substring(0, 2);
    return (
      <div key={element.main.temp} className="forecast-conditionBox">
        <div className="forecast-day">{day}</div>
        <img
          src={`http://openweathermap.org/img/w/${element.weather[0].icon}.png`}
          width="100"
          heigth="100"
          alt="icon"
        />
        <div className="forecast-description">
          {element.weather[0].description}
        </div>
        <div className="forecast-temp">
          {/* <div className="forecast-temp-min">
                            min: {element.main.temp_min}<span className="unit">° <a href="#" onClick={onClick} className="unit-link"> {unit}</a></span>
                        </div> */}
          <div className="forecast-temp-max">
            {temp}°
            <span className="unit">
              {/* eslint-disable-next-line */}
              <a href="#" onClick={onClick} className="forecast-unit-link">
                {unit}
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  });

  return <div className="forecast-wrapper">{show}</div>;
};

export default ForecastWeather;
