import "./style.css";
import NavBar from "./navBar";
import Views from "./views";

export const dummyLocation = {
  city: "Schiedam",
};

export const dummyWeather = {
  current: {
    temp_c: 15,
    condition: {
      text: "Rain",
    },
  },
};

export function sendData() {
  const data = [
    {
      city: "London",
    },
    {
      current: {
        temp_c: 25,
        condition: {
          text: "Sunny",
        },
      },
    },
  ];
  return data;
}

Views.init()
NavBar.create();
