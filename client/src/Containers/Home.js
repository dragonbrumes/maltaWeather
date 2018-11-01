import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import CurrentWeather from '../Components/CurrentWeather';
import ForecastWeather from '../Components/ForecastWeather';

import { API_ROOT } from '../config/apiConfig';

class Home extends Component {
  state = {
    units: 'metric',
    temp: null,
    humidity: null,
    main: undefined,
    description: undefined,
    wind: null,
    forecast: undefined,
    date: new Date().toLocaleString()
  };

  fetchWeather = (newUnits = 'metric') => {
    //call the current weather API
    axios.get(API_ROOT + 'weather/' + newUnits).then(res => {
      const { temp, humidity } = res.data.data.main;
      const { icon, main, description } = res.data.data.weather['0'];
      const { speed } = res.data.data.wind;

      this.setState({
        temp,
        humidity,
        icon,
        main,
        description,
        wind: speed
      });
    });
  };

  fetchForecast = (newUnits = 'metric') => {
    const dayFilterResults = [];
    //call the forecast weather api
    axios
      .get(API_ROOT + 'forecast/' + newUnits)
      .then(res => {
        const results = res.data.data.list;
        // console.log(results)
        // filtering to select only one day at 12:00
        const dayFilter = results.filter(el => {
          return _.includes(el.dt_txt, '12:00');
        });
        // stock filtered days to an array
        dayFilterResults.push(dayFilter);
        // insert into the state
        this.setState({
          forecast: dayFilterResults
        });
      })
      .catch(err => {
        console.log(err);
      });

    // console.log(dayFilterResults)
  };

  componentDidMount() {
    this.fetchWeather();
    this.fetchForecast();
  }

  handleClick = () => {
    // change the unit value (Celsius /Fahrenheit )
    const { units } = this.state;
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    this.setState({
      units: newUnits
    });
    // re fetch the data
    this.fetchWeather(newUnits);
    this.fetchForecast(newUnits);
  };

  render() {
    const { temp, units, forecast } = this.state;

    return (
      <div className="weather">
        <div className="weather-current">
          <h2>Current weather</h2>
          {temp !== null && (
            <CurrentWeather {...this.state} onClick={this.handleClick} />
          )}
        </div>
        <div className="weather-forecast">
          <h2>5 days forecast weather</h2>
          {forecast !== undefined && (
            <ForecastWeather
              forecast={forecast}
              units={units}
              onClick={this.handleClick}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
