export default class WeatherCard {
  constructor() {
    this.id;
    this.locationData = "";
    this.weatherData = "";
    this.bigCard = WeatherCard.create();
    this.smallCard = WeatherCard.createHeader();
    this.location = "";
  }

  set(locationData, weatherData) {
    this.locationData = locationData;
    this.weatherData = weatherData;

    this.bigCard.firstChild.childNodes[1].textContent = this.locationData.city;
    this.bigCard.firstChild.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${this.weatherData.current.condition.text}`;

    this.smallCard.childNodes[1].textContent = this.locationData.city;
    this.smallCard.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${this.weatherData.current.condition.text}`;
  }

  setLocation(location) {
    this.location = location;
    this.smallCard.childNodes[0].textContent = this.location;
  }

  getBigCard() {
    return this.bigCard;
  }

  getSmallCard() {
    return this.smallCard;
  }

  render(view) {
    document.body.append(view);
  }

  static update() {}

  static create() {
    const cardContainer = document.createElement("div");
    const cardHeader = WeatherCard.createHeader();
    cardContainer.className = "card-container";
    cardContainer.append(cardHeader);

    return cardContainer;
  }

  static createHeader() {
    const cardHeader = document.createElement("div");
    const locationField = document.createElement("div");
    const cityField = document.createElement("div");
    const tempStatusField = document.createElement("div");
    cardHeader.className = "card-header";
    locationField.className = "location-field";
    cityField.className = "city-field";
    tempStatusField.className = "tempStatus-field";

    locationField.textContent = "My Location";
    cardHeader.append(locationField, cityField, tempStatusField);

    return cardHeader;
  }

  static hourlyForecast() {}

  static _3dayForecast() {}
}
