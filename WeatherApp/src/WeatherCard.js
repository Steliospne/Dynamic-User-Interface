import { format } from "date-fns";

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
    const isDay = this.weatherData.current.is_day;
    const conditions = [
      { condition: "sunny", className: "sunny" },
      { condition: "partly cloudy", className: "partly-cloudy" },
      { condition: ["cloudy", "overcast"], className: "cloudy" },
      { condition: "rain", className: "rain" },
    ];
    if (isDay) {
      conditions.forEach(({ condition, className }) => {
        if (Array.isArray(condition)) {
          if (condition.some((cond) => queryCondition.includes(cond))) {
            this.bigCard.classList.add(className);
            this.smallCard.classList.add(className);
          }
        } else if (queryCondition.includes(condition)) {
          this.bigCard.classList.add(className);
          this.smallCard.classList.add(className);
        }
      });
    } else {
      this.bigCard.classList.add("night");
      this.smallCard.classList.add("night");
    }

    this.bigCard.firstChild.childNodes[0].textContent = this.name;
    this.bigCard.firstChild.childNodes[1].textContent = this.locationData;
    this.bigCard.firstChild.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${condition}`;

    this.smallCard.childNodes[1].textContent = this.locationData;
    this.smallCard.childNodes[2].innerHTML = `${this.weatherData.current.temp_c} &deg C | ${condition}`;

    // Hourly forecast list
    const hourlyDataList = this.weatherData.forecast.forecastday[0].hour;
    const hourlyCardList = this.bigCard.childNodes[1].childNodes;
    hourlyCardList.forEach((card) => {
      const conditionIcon = card.childNodes[1];
      const avgTemp = card.childNodes[2];
      const index = card.classList[1];
      conditionIcon.style.backgroundImage = `url(${hourlyDataList[index].condition.icon})`;

      avgTemp.textContent = Math.floor(hourlyDataList[index].temp_c) + "°C";
    });

    // 3-Day forecast
    const today = ["Today", this.weatherData.forecast.forecastday[0].day];
    const tomorrow = [
      this.weatherData.forecast.forecastday[1].date,
      this.weatherData.forecast.forecastday[1].day,
    ];
    const afterTomorrow = [
      this.weatherData.forecast.forecastday[2].date,
      this.weatherData.forecast.forecastday[2].day,
    ];

    const dailyData = [today, tomorrow, afterTomorrow];

    const dailyCardList = this.bigCard.childNodes[2].childNodes;
    dailyCardList.forEach((card) => {
      const dayField = card.childNodes[0];
      const conditionIcon = card.childNodes[1];
      const lowTemp = card.childNodes[2];
      const highTemp = card.childNodes[3];
      const index = card.classList[1];

      if (index == "0") {
        dayField.textContent = dailyData[index][0];
      } else {
        dayField.textContent = format(dailyData[index][0],"iiii");
      }

      lowTemp.textContent = `Low: ${Math.floor(dailyData[index][1].mintemp_c)}`   
      highTemp.textContent = `High: ${Math.floor(dailyData[index][1].maxtemp_c)}` 


      conditionIcon.style.backgroundImage = `url(${dailyData[index][1].condition.icon})`;
    });
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
    const forecastContainer = WeatherCard.hourlyForecast();
    const dailyForecastContainer = WeatherCard._3dayForecast();

    cardContainer.className = "card-container";
    cardContainer.append(cardHeader, forecastContainer, dailyForecastContainer);

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

  static hourlyForecast() {
    const forecastContainer = document.createElement("div");
    forecastContainer.className = "forecast-hourly";
    for (let hour = 0; hour < 24; hour++) {
      const hourCard = document.createElement("div");
      const hourField = document.createElement("div");
      const conditionIcon = document.createElement("div");
      const avgTemp = document.createElement("div");
      hourCard.className = "hour " + hour;
      hourField.className = "hour-field";
      conditionIcon.className = "condition-icon";
      avgTemp.className = "avg-temp";

      hourField.textContent = hour;

      hourCard.append(hourField, conditionIcon, avgTemp);
      forecastContainer.append(hourCard);
    }
    return forecastContainer;
  }

  static _3dayForecast() {
    const dailyForecastContainer = document.createElement("div");
    dailyForecastContainer.className = "daily-forecast";
    for (let days = 0; days < 3; days++) {
      const dailyCard = document.createElement("div");
      const dayField = document.createElement("div");
      const conditionIcon = document.createElement("div");
      const lowTemp = document.createElement("div");
      const highTemp = document.createElement("div");
      dailyCard.className = "daily-card " + days;
      dayField.className = "day-field";
      conditionIcon.className = "forecast-condition-icon";
      lowTemp.className = "low-temp";
      highTemp.className = "high-temp";

      dailyCard.append(dayField, conditionIcon, lowTemp, highTemp);
      dailyForecastContainer.append(dailyCard);
    }
    return dailyForecastContainer;
  }
}
