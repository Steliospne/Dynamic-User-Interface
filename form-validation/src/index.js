import "./style.css";

class Form {
    static wrapper = document.createElement("div");
    static form = document.createElement("form");
    static inputs = {
        nameLabel: document.createElement("label"),
        nameInput: document.createElement("input"),
        emailLabel: document.createElement("label"),
        emailInput: document.createElement("input"),
        countryLabel: document.createElement("label"),
        countryInput: document.createElement("input"),
        "zip-codeLabel": document.createElement("label"),
        "zip-codeInput": document.createElement("input"),
        pwdLabel: document.createElement("label"),
        pwdInput: document.createElement("input"),
        pwdValidationLabel: document.createElement("label"),
        pwdValidationInput: document.createElement("input"),
    };

    static formInit() {
        const body = document.querySelector("body");
        Form.form.classList.add("form");
        Form.form.setAttribute("novalidate", "");
        Form.wrapper.classList.add("form-wrapper");
        Form.formInputSetup();
        Form.formButtonSetup();
        body.append(Form.wrapper);
        Form.formValidation();
    }

    static formInputSetup() {
        let counter = 0;
        let wrapper = document.createElement("div");
        for (let input in Form.inputs) {
            wrapper.classList.add("form-input-wrapper");
            const errorMessage = document.createElement("span");
            errorMessage.classList.add("error");
            if (input.includes("Input")) {
                Form.inputs[input].id = input.slice(0, -5);
                Form.inputs[input].name = input.slice(0, -5);
            }

            if (input.includes("Label")) {
                Form.inputs[input].htmlFor = input.slice(0, -5);
                input.slice(0, 3) == "pwd"
                    ? (Form.inputs[input].innerText = "Password:")
                    : (Form.inputs[input].innerText =
                          input.charAt(0).toUpperCase() +
                          input.slice(1, -5) +
                          ":");
            }

            wrapper.append(Form.inputs[input]);
            if (counter % 2) {
                Form.form.append(wrapper);
                wrapper.append(errorMessage);
                wrapper = document.createElement("div");
            }
            counter++;
        }

        Form.wrapper.append(Form.form);
    }

    static formButtonSetup() {
        const button = document.createElement("button");
        const wrapper = document.createElement("div");
        wrapper.classList.add("form-input-wrapper");

        button.className = "submit";
        button.innerText = "Submit";

        wrapper.append(button);
        Form.form.append(wrapper);
    }

    static formValidation() {
        const inputDivs = document.querySelectorAll(
            ".form-input-wrapper>input"
        );
        const errorMessages = document.querySelectorAll(
            ".form-input-wrapper>span"
        );
        const pwd = document.querySelector("#pwd");
        const pwdValidation = document.querySelector("#pwdValidation");
        console.log(inputDivs, errorMessages);

        for (let i = 0; i < 4; i++) {
            setConstraints(inputDivs[i]);

            inputDivs[i].addEventListener("input", (e) => {
                // console.log(e.target.validity.valid);
                if (e.target.validity.valid) {
                    errorMessages[i].textContent = "";
                    errorMessages[i].className = "error";
                } else {
                    showError(e.target);
                }
            });
        }

        for (let k = 4; k < 6; k++) {
            setConstraints(inputDivs[k]);
            inputDivs[k].addEventListener("keyup", (e) => {
                console.log(pwd.value !== pwdValidation.value);
                if (!e.target.checkValidity()) {
                    showError(e.target);
                }
                if (pwd.value !== pwdValidation.value) {
                    e.target.setCustomValidity(".");
                    showError(e.target);
                } else {
                    errorMessages[4].textContent = "";
                    errorMessages[4].className = "error";
                    inputDivs[4].setCustomValidity("");
                    errorMessages[5].textContent = "";
                    errorMessages[5].className = "error";
                    inputDivs[5].setCustomValidity("");
                }
            });
        }

        Form.form.addEventListener("submit", (event) => {

            for (let input of inputDivs) {
                if (!input.checkValidity()) {
                    event.preventDefault();
                }
            }
        });

        function setConstraints(target) {
            switch (target.id) {
                case "name":
                    target.setAttribute("type", "text");
                    target.setAttribute("minlength", "3");
                    target.setAttribute("required", "");
                    break;
                case "email":
                    target.setAttribute("type", "email");
                    target.setAttribute("minlength", "8");
                    target.setAttribute("required", "");
                    break;
                case "country":
                    target.setAttribute("type", "text");
                    break;
                case "zip-code":
                    target.setAttribute("type", "text");
                    break;
                case "pwd":
                    target.setAttribute("type", "password");
                    target.setAttribute("minlength", "8");
                    target.setAttribute("required", "");
                    break;
                case "pwdValidation":
                    target.setAttribute("type", "password");
                    target.setAttribute("minlength", "8");
                    target.setAttribute("required", "");
                    break;
            }
        }

        function showError(target) {
            const targetID = target.id;
            if (targetID == "name") {
                if (target.validity.valueMissing) {
                    target.nextSibling.textContent = "The name field is empty";
                } else if (target.validity.tooShort) {
                    target.nextSibling.textContent = `
                         This name must must be at least ${target.minLength} characters long.
                         You entered ${target.value.length}`;
                }
            } else if (targetID == "email") {
                if (target.validity.valueMissing) {
                    target.nextSibling.textContent = "The email field is empty";
                } else if (target.validity.typeMismatch) {
                    target.nextSibling.textContent = `Invalid email`;
                } else if (target.validity.tooShort) {
                    target.nextSibling.textContent = `
                        This email must must be at least ${target.minLength} characters long.
                        - You entered ${target.value.length}`;
                }
            } else if (targetID == "country") {
                target.nextSibling.textContent = "This field is required";
            } else if (targetID == "zip-code") {
                target.nextSibling.textContent = "This field is required";
            } else if (targetID == "pwd") {
                if (target.validity.valueMissing) {
                    target.nextSibling.textContent = "The email field is empty";
                } else if (target.validity.tooShort) {
                    target.nextSibling.textContent = `
                        This email must must be at least ${target.minLength} characters long.
                        - You entered ${target.value.length}`;
                } else if (pwd.value !== pwdValidation.value) {
                    inputDivs[4].nextSibling.textContent =
                        "Passwords do not match";
                    inputDivs[4].nextSibling.className = "error-active";
                    inputDivs[5].nextSibling.textContent =
                        "Passwords do not match";
                    inputDivs[5].nextSibling.className = "error-active";
                }
            }
            target.nextSibling.className = "error-active";
        }
    }
}
window.onload = function () {
    Form.formInit();
};
