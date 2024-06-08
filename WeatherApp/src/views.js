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

    Views.setView(initialView);
    // Views.big.push(initialView);
    // Views.big.forEach((obj) => {
    //   obj.id = Views.counterBig;
    //   obj.bigCard.id = Views.counterBig;
    //   Views.counterBig++;
    //   Views.render(obj.bigCard);
    // });

    // Views.small.push(initialView.getSmallCard());
    // Views.small.forEach((view) => {
    //   view.id = Views.counterSmall;
    //   view.className = "small-view off";
    //   Views.counterSmall++;
    // });
  }

  static getSmallViews() {
    return Views.small;
  }

  static deleteView(id) {
    Views.big = Views.big.filter((view) => view.id !== +id);
    Views.small = Views.small.filter((view) => view.id !== id);
  }

  static setView(view) {
    Views.big.push(view);
    Views.big.forEach((obj) => {
      obj.id = Views.counterBig;
      obj.bigCard.id = Views.counterBig;
      Views.counterBig++;
      Views.render(obj.bigCard);
    });
    Views.small.push(view.getSmallCard());
    Views.small.forEach((view) => {
      view.id = Views.counterSmall;
      view.className = "small-view on";
      Views.counterSmall++;
    });
  }

  static render(view) {
    const displayContainer = document.querySelector(".display-container");
    // displayContainer.innerHTML = "";
    displayContainer.append(view);
  }
}
