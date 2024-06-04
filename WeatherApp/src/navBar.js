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
      } else {
        menu.classList.remove("on");
        menu.classList.add("off");
      }
    }

    return menuButtonEl;
  }

  static createMenu() {
    const menu = document.createElement("div");
    menu.className = "menu off";
    return menu;
  }
}
