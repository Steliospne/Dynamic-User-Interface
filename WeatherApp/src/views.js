import WeatherCard from "./WeatherCard";

export default class Views {
  static small = [];
  static big = [];
  static counterBig = 0;
  static counterSmall = 0;

  static init() {
    const initialView = new WeatherCard();
    const displayContainer = document.createElement("div");
    displayContainer.className = "display-container";
    document.body.append(displayContainer);

    Views.big.push(initialView);
    Views.big.forEach((obj) => {
      obj.id = Views.counterBig;
      obj.bigView.id = Views.counterBig;
      Views.counterBig++;
      Views.render(obj.bigView);
    });

    Views.small.push(initialView.getSmallView());
    Views.small.forEach((view) => {
      view.id = Views.counterSmall;
      view.className = "small-view off";
      Views.counterSmall++;
    });
  }

  static getSmallViews() {
    return Views.small;
  }

  static setView(view) {
    Views.big.push(view);
    Views.big.forEach((obj) => {
      obj.id = Views.counterBig;
      obj.bigView.id = Views.counterBig;
      Views.counterBig++;
      Views.render(obj.bigView);
    });
    Views.small.push(view.getSmallView());
    Views.small.forEach((view) => {
      view.className = "small-view on";
    });
  }

  static render(view) {
    const displayContainer = document.querySelector(".display-container")
    // displayContainer.innerHTML = "";
    displayContainer.append(view);
  }
}
