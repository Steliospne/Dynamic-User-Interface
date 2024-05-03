import "./style.css";

export default class Carousel {
    static wrapper = document.createElement("div");
    static container = document.createElement("div");
    static panel = document.createElement("div");
    static leftArrow = document.createElement("div");
    static rightArrow = document.createElement("div");
    static image = document.createElement("img");
    static dotWrapper = document.createElement("div");
    static numberOfImages = 4;
    static i = 1;

    static carouselInit() {
        const body = document.querySelector("body");

        Carousel.wrapper.classList.add("wrapper");
        Carousel.container.classList.add("container");
        Carousel.panel.classList.add("panel");
        Carousel.leftArrow.classList.add("left-arrow");
        Carousel.rightArrow.classList.add("right-arrow");
        Carousel.image.classList.add("image-1");

        Carousel.container.append(Carousel.image);
        Carousel.panel.append(
            Carousel.container,
            Carousel.leftArrow,
            Carousel.rightArrow
        );
        Carousel.wrapper.append(Carousel.panel);
        body.append(Carousel.wrapper);

        Carousel.leftArrow.addEventListener("click", () => {
            if (this.i == 1) this.i = 4;
            else if (this.i > 1) this.i--;
            Carousel.image.className = `image-${this.i}`;
            Carousel.navDotSelector(this.i);
        });

        Carousel.rightArrow.addEventListener("click", () => {
            if (this.i == 4) this.i = 1;
            else if (this.i < 4) this.i++;
            Carousel.image.className = `image-${this.i}`;
            Carousel.navDotSelector(this.i);
        });

        Carousel.leftArrow.addEventListener("mouseover", () => {
            Carousel.leftArrow.classList.add("pause");
        });

        Carousel.leftArrow.addEventListener("mouseout", () => {
            Carousel.leftArrow.classList.remove("pause");
        });

        Carousel.rightArrow.addEventListener("mouseover", () => {
            Carousel.rightArrow.classList.add("pause");
        });

        Carousel.rightArrow.addEventListener("mouseout", () => {
            Carousel.rightArrow.classList.remove("pause");
        });

        Carousel.navDots();
        Carousel.navDotSelector(Carousel.i);
    }

    static loopThrough() {
        if (
            !(
                Carousel.leftArrow.className.includes("pause") ||
                Carousel.rightArrow.className.includes("pause") ||
                Carousel.dotWrapper.className.includes("pause")
            )
        ) {
            if (Carousel.i == 4) Carousel.i = 1;
            else Carousel.i++;
            Carousel.navDotSelector(Carousel.i);
        }
        Carousel.image.className = `image-${Carousel.i}`;
    }

    static navDots() {
        Carousel.dotWrapper.classList.add("dot-wrapper");

        for (let i = 1; i < Carousel.numberOfImages + 1; i++) {
            const dot = document.createElement("div");
            dot.className = `dot ${i}`;

            dot.addEventListener("click", (e) => {
                const targetI = e.target.className.slice(-1);
                Carousel.i = parseInt(targetI);
                Carousel.image.className = `image-${targetI}`;
                Carousel.navDotSelector(Carousel.i);
            });

            dot.addEventListener("mouseover", () => {
                Carousel.dotWrapper.classList.add("pause");
            });

            dot.addEventListener("mouseout", () => {
                Carousel.dotWrapper.classList.remove("pause");
            });

            Carousel.dotWrapper.append(dot);
        }
        Carousel.panel.append(Carousel.dotWrapper);
    }

    static navDotSelector(target) {
        const dots = document.getElementsByClassName("dot");
        for (let dot of dots) {
            if (dot.className.includes("selected")) {
                dot.classList.remove("selected");
            }
        }
        dots[target - 1].classList.add("selected");
    }
}
window.onload = function () {
    Carousel.carouselInit();
};

window.setInterval(Carousel.loopThrough, 5000);
