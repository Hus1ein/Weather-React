import React, { Component } from 'react';
import Titles from "./Components/Titles";
import Form from "./Components/Form";
import Weather from "./Components/Weather";
import './App.css';

const API_KEY = "e736ddaaa219e1092a45edc5f763a5c9";

class App extends Component {

  state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
  };
  getWeather = async (e) => {
      e.preventDefault();
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;
      if(city && country) {
          let url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;
          const api_call = await fetch(url);
          const data = await api_call.json();
          console.log(data);
          this.setState({
              temperature: data.main.temp,
              city: data.name,
              country: data.sys.country,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              error: ""
          });
      }else{
          this.setState({
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Please enter correct values."
          });
      }

  };
  render() {

    return (
      <div>
          <div className="wrapper">
              <div className="main">
                  <div className="container">
                      <div className="row">
                          <div className="col-xs-5 title-container">
                              <Titles/>
                          </div>
                          <div className="col-xs-7 form-container">
                              <Form getWeather={this.getWeather}/>
                              <Weather
                                  temperature={this.state.temperature}
                                  city={this.state.city}
                                  country={this.state.country}
                                  humidity={this.state.humidity}
                                  description={this.state.description}
                                  error={this.state.error}/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
