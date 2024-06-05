import Views from "./views";

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
      menu_state = menu_state == 0 ? 1 : 0;

      if (menu_state) {
        menu.classList.add("on");
        menu.classList.remove("off");
        menu.childNodes.forEach((child) => {
          child.classList.add("on");
          child.classList.remove("off");
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
    const smallViews = Views.getSmallViews();
    const searchWrapper = document.createElement("div");
    const inputCity = document.createElement("input");
    const searchButton = document.createElement("button");

    searchWrapper.className = "search-wrapper off";
    inputCity.id = "city";
    inputCity.name = "city";
    inputCity.placeholder = "Search for city or town"
    searchButton.className = "search-btn"
    searchWrapper.append(inputCity, searchButton)
    menu.append(searchWrapper);

    function searchHandler() {
      let input = inputCity.value;
      console.log(input)
      if(!input) return
      inputCity.value = ""
    }

    searchButton.addEventListener('click', searchHandler)
    
    smallViews.forEach((view) => {
      menu.append(view);
    });
    menu.className = "menu off";


    return menu;
  }
}
