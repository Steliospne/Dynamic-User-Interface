export default class WeatherCard {
  static set(locationData, weatherData) {
    WeatherCard.locationData = locationData;
    WeatherCard.weatherData = weatherData;
    document.querySelector(".city-field").textContent = WeatherCard.locationData.city;
    document.querySelector(".tempStatus-field").innerHTML = `${WeatherCard.weatherData.current.temp_c} &deg C | ${WeatherCard.weatherData.current.condition.text}`;
  }

  static update() {}

  static create() {
    const cardContainer = document.createElement("div");
    const cardHeader = document.createElement("div");
    const locationField = document.createElement("div");
    const cityField = document.createElement("div");
    const tempStatusField = document.createElement("div");

    cardContainer.className = "card-container";
    cardHeader.className = "card-header";
    locationField.className = "location-field";
    cityField.className = "city-field";
    tempStatusField.className = "tempStatus-field";

    locationField.textContent = "My Location";

    cardHeader.append(locationField, cityField, tempStatusField);
    cardContainer.append(cardHeader);
    document.body.append(cardContainer);
  }
}
