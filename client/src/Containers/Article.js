import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import _ from 'lodash';

import CurrentWeather from '../Components/CurrentWeather';
import ForecastWeather from '../Components/ForecastWeather';

import { API_ROOT } from '../config/apiConfig';

class Article extends Component {
  state = {
    title: undefined,
    content: undefined,
    articles: ''
  };

  fetchArticles = () => {
    //call the current weather API
    // const { units } = this.state;
    console.log('fetchArticles');
    axios.get(API_ROOT + 'article/5b93ae34b233f03b20007368').then(res => {
      console.log(res.data);

      //   const { title, content } = res.data;
      // const { icon, main, description } = res.data.data.weather['0'];
      // const { speed } = res.data.data.wind;

      this.setState({ title: res.data.title, content: res.data.content });
    });
  };
  // fetchArticles = () => {
  //   //call the current weather API
  //   // const { units } = this.state;
  //   axios.get(API_ROOT + 'articles').then(res => {
  //     console.log(res.data);

  //     //   const { title, content } = res.data;
  //     // const { icon, main, description } = res.data.data.weather['0'];
  //     // const { speed } = res.data.data.wind;

  //     this.setState({
  //       articles: res.data
  //     });
  //   });
  // };

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
    this.fetchArticles();
    // this.fetchForecast();
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
    const { title, content } = this.state;
    console.log(title, content);
    // if (articles) {
    //   const Articles = () => {
    //     articles.map(el => {
    //       return (
    //         <div>
    //           <h1>{el.title}</h1>
    //           <div>{el.content}</div>
    //         </div>
    //       );
    //     });
    //   }; //const
    // } //if
    return (
      <div className="weather">
        <div className="weather-current">
          <h1>{title}</h1>
          <ReactMarkdown source="# This is a header ##And this is a paragraph" />
          {/* <div>{content}</div> */}
          {/* <Articles /> */}
          {/* {temp !== null && (
                        <CurrentWeather {...this.state} onClick={this.handleClick} />
                    )} */}
        </div>
      </div>
    );
  }
}

export default Article;
