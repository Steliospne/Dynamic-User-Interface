import Views from "./views";
import { swipedetect } from "./touch";
import APIs from "./APIs";

export default class NavBar {
  static menu = NavBar.createMenu();
  static menuButton = NavBar.menuButton();

  static create() {
    const nav = document.createElement("div");
    nav.className = "navbar";

    nav.append(NavBar.menu, NavBar.menuButton);
    document.body.append(nav);
  }

  static menuButton() {
    const menuButtonEl = document.createElement("button");
    const buttonIcon = document.createElement("i");
    menuButtonEl.className = "menu-btn";
    buttonIcon.className = "button-icon";

    menuButtonEl.append(buttonIcon);

    let menu_state = 0;
    menuButtonEl.addEventListener("click", buttonHandler);

    function buttonHandler() {
      const menu = document.querySelector(".menu");
      const menuList = Array.from(menu.childNodes);
      const smallViewList = Views.getSmallViews();

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

    searchWrapper.className = "search-wrapper off";
    inputCity.id = "city";
    inputCity.name = "city";
    inputCity.placeholder = "Search for city or town";
    searchButton.className = "search-btn";

    searchWrapper.append(inputCity, searchButton);
    menu.append(searchWrapper);
    searchButton.addEventListener("click", searchHandler);
    menu.addEventListener("keydown", (event) => {
      event.key == "Enter" ? searchHandler() : 0;
    });

    menu.className = "menu off";
    async function searchHandler() {
      try {
        let input = inputCity.value;
        if (!input) return;
        const card = await APIs.getWeather(input);
        NavBar.smallCardHandlers(card);
        menu.append(card.smallCard);
        Views.render(Views.big);
        inputCity.value = "";
        Views.storedViews.push(input);
        localStorage.setItem("Stored_views", JSON.stringify(Views.storedViews));
      } catch (error) {
        console.log(error);
      }
    }

    return menu;
  }

  static smallCardHandlers(card) {
    function hoverInHandler() {
      const delButton = document.createElement("button");
      delButton.className = "delete-btn";
      card.smallCard.append(delButton);

      function deleteButtonHandler(event) {
        const target = event.target.parentNode;
        const cardContainers =
          document.querySelector(".display-container").childNodes;
        let cardToRemove = Array.from(cardContainers).filter((node) => {
          return node.id == target.id;
        });
        Views.deleteView(target.id);
        cardToRemove[0].remove();
        target.remove();
      }
      delButton.addEventListener("click", deleteButtonHandler);
      delButton.addEventListener("touchstart", deleteButtonHandler);
    }

    function hoverOutHandler() {
      card.smallCard.lastChild.remove();
    }

    if (card.smallCard.firstChild.textContent !== "My Location") {
      card.smallCard.addEventListener("mouseenter", hoverInHandler);
      card.smallCard.addEventListener("mouseleave", hoverOutHandler);

      swipedetect(card.smallCard, function (swipedir) {
        if (
          swipedir == "left" &&
          !card.smallCard.lastChild.outerHTML.includes("button")
        )
          hoverInHandler();
        if (
          swipedir == "right" &&
          card.smallCard.lastChild.outerHTML.includes("button")
        ) {
          hoverOutHandler();
        }
      });
    }

    function clickOnCardHandler(event) {
      let target = event.target.outerHTML;
      if(target.includes("button")) return
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

    card.smallCard.addEventListener("click", clickOnCardHandler);
    card.smallCard.addEventListener("touchstart", clickOnCardHandler);
  }
}
