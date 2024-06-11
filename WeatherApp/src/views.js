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
      function clickOnCardHandler(event) {
        let target = event.target.outerHTML;
        target.includes("small-view")
          ? (target = event.target)
          : (target = event.target.parentElement);
        const targetId = target.id;
        const displayList = Array.from(
          document.querySelector(".display-container").childNodes
        );
        displayList.forEach((card) => {
          if (card.id == targetId) {
            card.setAttribute("style", "display: flex");
          } else {
            card.setAttribute("style", "display: none");
          }
        });
      }
      Views.big[0].smallCard.addEventListener("click", clickOnCardHandler);
      Views.render(Views.big);
    } catch (error) {
      console.log(error);
    }
  }

  static getSmallViews() {
    return Views.small;
  }

  static deleteView(id) {
    Views.storedViews = Views.storedViews.filter(
      (item) => item !== Views.big.filter((view) => view.id === +id)[0].name);
    Views.big = Views.big.filter((view) => view.id !== +id);
    Views.small = Views.small.filter((view) => view.id !== id);
    localStorage.setItem("Stored_views", JSON.stringify(Views.storedViews));
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
