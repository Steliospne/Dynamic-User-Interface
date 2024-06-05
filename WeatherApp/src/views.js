import WeatherCard from "./WeatherCard";

export default class Views {
  static small = [];
  static big = [];

  static init() {
    Views.small.push(WeatherCard.getHeader());
    Views.small.forEach((view) => {
      view.className = "small-view off";
    });
  }

  static getSmallViews() {
    return Views.small;
  }
}
