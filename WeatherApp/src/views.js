import { dummyLocation, dummyWeather } from ".";
import APIs from "./APIs";
import NavBar from "./navBar";

export default class Views {
  static small = [];
  static big = [];
  static storedViews = [];
  static counterBig = 0;
  static counterSmall = 0;

  static async init() {
    try {
      const displayContainer = document.createElement("div");
      displayContainer.className = "display-container";
      document.body.append(displayContainer);
      await APIs.getLocalWeather();
      if (localStorage.length !== 0) {
        Views.storedViews = JSON.parse(localStorage.getItem("Stored_views"));

        for (let locationName of Views.storedViews) {
          let tempObj = await APIs.getWeather(locationName);
          NavBar.smallCardHandlers(tempObj);
        }
      }
      Views.render(Views.big);
    } catch (error) {
      console.log(error);
    }
  }

  static getSmallViews() {
    return Views.small;
  }

  static deleteView(id) {
    Views.big = Views.big.filter((view) => view.id !== +id);
    Views.small = Views.small.filter((view) => view.id !== id);
  }

  static setView(view) {
    view.id = Views.counterBig;
    view.bigCard.id = Views.counterBig;
    view.smallCard.id = Views.counterSmall;
    view.smallCard.classList.add("small-view", "on");
    Views.counterBig++;
    Views.counterSmall++;
    Views.big.push(view);
    Views.small.push(view.getSmallCard());
  }

  static render(array) {
    const displayContainer = document.querySelector(".display-container");
    array.forEach((view) => {
      displayContainer.append(view.bigCard);
    });
  }

  static update() {
    setInterval(() => {}, 30 * 60000);
  }
}
