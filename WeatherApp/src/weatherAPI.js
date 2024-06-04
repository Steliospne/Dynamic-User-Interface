export default async function getWeatherData(location) {
  let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2157e38e798c411b98c172949240106&q=${location}`);
  let weather_data = await response.json();

  return weather_data;
}
