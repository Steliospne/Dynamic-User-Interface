export default class WeatherCard {
  constructor() {
    this.id;
    this.locationData = "";
    this.weatherData = "";
    this.bigCard = WeatherCard.create();
    this.smallCard = WeatherCard.createHeader();
    this.name = "My Location";
  }

  setData(weatherData) {
    this.name === "My Location"
      ? (this.locationData = weatherData.location.name)
      : (this.locationData = weatherData.location.country);

    this.weatherData = weatherData;

    const condition = this.weatherData.current.condition.text;
    const queryCondition = condition.toLowerCase();

    const conditions = [
      { condition: "sunny", className: "sunny" },
      { condition: "partly cloudy", className: "partly-cloudy" },
      { condition: ["cloudy", "overcast"], className: "cloudy" },
      { condition: "rain", className: "rain" },
    ];
    
    conditions.forEach(({ condition, className }) => {
      if (Array.isArray(condition)) {
        if (condition.some(cond => queryCondition.includes(cond))) {
          this.bigCard.classList.add(className);
          this.smallCard.classList.add(className);
        }
      } else if (queryCondition.includes(condition)) {
        this.bigCard.classList.add(className);
        this.smallCard.classList.add(className);
      }
    });

    this.bigCard.firstChild.childNodes[1].textContent = this.locationData;
    this.bigCard.firstChild.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${condition}`;

    this.smallCard.childNodes[1].textContent = this.locationData;
    this.smallCard.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${condition}`;
  }

  setName(name) {
    this.name = name;
    this.smallCard.childNodes[0].textContent = this.name;
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
