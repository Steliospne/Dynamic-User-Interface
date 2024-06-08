import "./style.css";
import getLocation from "./locationAPI";
import getWeatherData from "./weatherAPI";
import WeatherCard from "./WeatherCard";
import NavBar from "./navBar";
import Views from "./views";

const dummyLocation = {
  city: "Schiedam",
};

const dummyWeather = {
  current: {
    temp_c: 15,
    condition: {
      text: "Rain",
    },
  },
};

export function sendData() {
  const data = [
    {
      city: "London",
    },
    {
      current: {
        temp_c: 25,
        condition: {
          text: "Sunny",
        },
      },
    },
  ];
  return data;
}
async function getherData() {
  try {
    // let locationData = await getLocation();
    // let weatherData = await getWeatherData(locationData.city);
    // let weatherData = await getWeatherData("Schiedam");
    // let weatherData2 = await getWeatherData("London");
    // localStorage.setItem("weatherData",JSON.stringify(weatherData))
    // localStorage.setItem("weatherData2",JSON.stringify(weatherData2))
    // WeatherCard.set(locationData, weatherData);

    // Test to not waste API calls
    Views.big[0].set(dummyLocation, dummyWeather);
  } catch (error) {
    throw error;
  }
}

Views.init();
getherData();
NavBar.create();
