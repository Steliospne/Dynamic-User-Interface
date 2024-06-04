export default class NavBar {
  static create() {
    const nav = document.createElement("div");
    const addLocationButton = document.createElement("button");
    const buttonIcon = document.createElement("i");

    nav.className = "navbar";
    addLocationButton.className = "add-location";
    buttonIcon.className = "button-icon";

    addLocationButton.textContent = "=";

    addLocationButton.append(buttonIcon);
    nav.append(addLocationButton);
    document.querySelector(".card-container").append(nav);

    NavBar.eventSetter();
  }

  static eventSetter() {
    let state = 0;
    const popUp = document.createElement("div");
    popUp.className = "pop-up off";
    document.body.append(popUp);
    function buttonHandler() {
      state = state == 0 ? 1 : 0;
      if (state) {
        popUp.classList.add("on");
        popUp.classList.remove("off");
      } else {
        popUp.classList.remove("on");
        popUp.classList.add("off");
      }
    }
    document
      .querySelector(".add-location")
      .addEventListener("click", buttonHandler);
  }
}
