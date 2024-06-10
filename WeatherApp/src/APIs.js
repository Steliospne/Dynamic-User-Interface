import WeatherCard from "./WeatherCard";
import Views from "./views";

export default class APIs {
  static async getIP() {
    try {
      let response = await fetch("https://api.iplocation.net/?cmd=get-ip");
      let data = await response.json();
      return data.ip;
    } catch (error) {
      console.log(error);
    }
  }

  static async getLocation() {
    try {
      let ip = await APIs.getIP();
      let response2 = await fetch(
        `https://ipinfo.io/${ip}?token=0f075b8ac8611a`
      );
      let location_data = await response2.json();

      return location_data.city;
    } catch (error) {
      console.log(error);
    }
  }

  static async getWeatherData(location) {
    try {
      let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=2157e38e798c411b98c172949240106&q=${location}&days=3`
      );
      let weather_data = await response.json();

      return weather_data;
    } catch (error) {
      console.log(error);
    }
  }
  static async getLocalWeather() {
    try {
      let location = await APIs.getLocation();
      let data = await APIs.getWeatherData(location);
      const view = new WeatherCard();
      view.setData(data);
      Views.setView(view);
      Views.render(Views.big)
    } catch (error) {
      console.log(error);
    }
  }
  static async getWeather(location) {
    try {
      let data = await APIs.getWeatherData(location);
      const view = new WeatherCard();
      view.setName(location)
      view.setData(data);
      Views.setView(view);
      return view
    } catch (error) {
      console.log(error);
    }
  }
}
