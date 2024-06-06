export default class WeatherCard {
  constructor() {
    this.id;
    this.locationData = "";
    this.weatherData = "";
    this.bigView = WeatherCard.create();
    this.smallView = WeatherCard.createHeader();
    this.location = "";
  }

  set(locationData, weatherData) {
    this.locationData = locationData;
    this.weatherData = weatherData;

    this.bigView.firstChild.childNodes[1].textContent = this.locationData.city;
    this.bigView.firstChild.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${this.weatherData.current.condition.text}`;

    this.smallView.childNodes[1].textContent = this.locationData.city;
    this.smallView.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${this.weatherData.current.condition.text}`;
  }

  setLocation(location) {
    this.location = location;
    this.smallView.childNodes[0].textContent = this.location;
  }

  getBigView() {
    return this.bigView;
  }

  getSmallView() {
    return this.smallView;
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
}
