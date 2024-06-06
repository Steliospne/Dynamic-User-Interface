import { sendData } from ".";
import WeatherCard from "./WeatherCard";
import Views from "./views";
import { swipedetect } from "./touch";

export default class NavBar {
  static create() {
    const nav = document.createElement("div");
    nav.className = "navbar";

    nav.append(NavBar.createMenu(), NavBar.menuButton());
    document.body.append(nav);
  }

  static menuButton() {
    const menuButtonEl = document.createElement("button");
    const buttonIcon = document.createElement("i");
    menuButtonEl.className = "add-location";
    buttonIcon.className = "button-icon";

    menuButtonEl.textContent = "=";
    menuButtonEl.append(buttonIcon);

    let menu_state = 0;
    menuButtonEl.addEventListener("click", buttonHandler);

    function buttonHandler() {
      const menu = document.querySelector(".menu");
      const menuList = Array.from(menu.childNodes);
      const smallViewList = Views.getSmallViews();
      console.log(menuList);
      // const smallCardWrapper = document.querySelector(".small-card-wrapper");
      smallViewList.forEach((item) => menu.append(item));

      menu_state = menu_state == 0 ? 1 : 0;

      if (menu_state) {
        menu.classList.add("on");
        menu.classList.remove("off");
        menu.childNodes.forEach((child) => {
          child.classList.add("on");
          child.classList.remove("off");
        });

        smallViewList.forEach((item) => {
          if (!menuList.includes(item)) menuList.push(item);
        });
      } else {
        menu.classList.remove("on");
        menu.classList.add("off");
        menu.childNodes.forEach((child) => {
          child.classList.remove("on");
          child.classList.add("off");
        });
      }
    }

    return menuButtonEl;
  }

  static createMenu() {
    const menu = document.createElement("div");
    const searchWrapper = document.createElement("div");
    const inputCity = document.createElement("input");
    const searchButton = document.createElement("button");
    // const smallCardWrapper = document.createElement("div");

    searchWrapper.className = "search-wrapper off";
    inputCity.id = "city";
    inputCity.name = "city";
    inputCity.placeholder = "Search for city or town";
    searchButton.className = "search-btn";
    // smallCardWrapper.className = "small-card-wrapper";

    searchWrapper.append(inputCity, searchButton);
    menu.append(searchWrapper);

    function searchHandler() {
      let input = inputCity.value;
      if (!input) return;
      let data1, data2;
      [data1, data2] = sendData();
      // console.log(data1, data2);
      const newView = new WeatherCard();
      newView.set(data1, data2);
      newView.setLocation(input);
      Views.setView(newView);

      function hoverInHandler() {
        const delButton = document.createElement("button");
        delButton.className = "delete-btn";
        newView.smallView.append(delButton);
      }

      function hoverOutHandler() {
        newView.smallView.lastChild.remove();
      }

      if (newView.smallView.firstChild.textContent !== "My Location") {
        newView.smallView.addEventListener("mouseenter", hoverInHandler);
        newView.smallView.addEventListener("mouseleave", hoverOutHandler);

        swipedetect(newView.smallView, function (swipedir) {
          if (swipedir == "left") hoverInHandler();
          if (
            swipedir == "right" &&
            newView.smallView.lastChild.outerHTML.includes("button")
          ) {
            hoverOutHandler();
          }
        });
      }
      menu.append(newView.smallView)
      inputCity.value = "";
    }
    searchButton.addEventListener("click", searchHandler);

    menu.className = "menu off";

    return menu;
  }
}
