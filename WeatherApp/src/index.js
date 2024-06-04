import "./style.css";
import getLocation from "./locationAPI";
import getWeatherData from "./weatherAPI";
import WeatherCard from "./WeatherCard";
import NavBar from "./navBar";

const dummyLocation = {
  city: "Schiedam",
};

const dummyWeather = {
  current: {
    temp_c: 25,
    condition: { 
      text: "Rain" 
    },
  },
};

async function getherData() {
  try {
    // let locationData = await getLocation();
    // let weatherData = await getWeatherData(locationData.city);
    // WeatherCard.set(locationData, weatherData);

    // Test to not waste API calls
    WeatherCard.set(dummyLocation, dummyWeather);
  } catch (error) {
    throw error;
  }
}

WeatherCard.create();
NavBar.create();
getherData();

