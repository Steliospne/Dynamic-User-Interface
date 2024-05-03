import "./style.css";

export default class DropDown {
    static body = document.querySelector("body");
    static dropDownWrapper = document.createElement("div");
    static dropDownButton = document.createElement("button");
    static dropDownMenuWrapper = document.createElement("div");
    static dropDownMenu = document.createElement("div");

    static dropDownInit() {
        DropDown.dropDownWrapper.classList.add("drop-down-wrapper");
        DropDown.dropDownButton.textContent = "Menu";
        DropDown.dropDownButton.classList.add("drop-down-button");
        DropDown.dropDownMenuWrapper.classList.add("drop-down-button-wrapper");
        DropDown.dropDownMenu.classList.add("drop-down-menu");

        DropDown.dropDownMenu.innerHTML = `
            <button class="${"Products"}"><i></i>${"Products"}</button> 
            <button class="${"History"}"><i></i>${"History"}</button> 
            <button class="${"Options"}"><i></i>${"Options"}</button> 
            <button class="${"About"}"><i></i>${"About"}</button> 
            `;

        DropDown.dropDownWrapper.append(
            DropDown.dropDownButton,
            DropDown.dropDownMenuWrapper
        );
        DropDown.dropDownMenuWrapper.append(DropDown.dropDownMenu);
        DropDown.body.append(DropDown.dropDownWrapper);

        const handler = () => {
            DropDown.dropDownMenu.className.includes("hidden")
                ? DropDown.dropDownMenu.classList.remove("hidden")
                : DropDown.dropDownMenu.classList.add("hidden");
        };

        DropDown.dropDownButton.addEventListener("click", handler);
    }
}

DropDown.dropDownInit();