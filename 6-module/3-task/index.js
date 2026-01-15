import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this._count = 0;
    this.render();
  }

  get elem() {
    return this._elem;
  }
  render() {
    this._elem = document.createElement("div");
    this._elem.classList.add("carousel");
    const btnLeft = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>`);
    this._elem.append(btnLeft);

    const btnRight = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>`);
    this._elem.append(btnRight);

    const carouselInner = document.createElement("div");
    carouselInner.classList.add("carousel__inner");

    this.slides.forEach((el) => {
      const slide = createElement(
        `
        <div class="carousel__slide" data-id="${el.id}">
            <img src="/assets/images/carousel/${el.image}" 
                 class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${el.price.toFixed(2)}</span>
              <div class="carousel__title">${el.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
      `
      );
      slide.querySelector(".carousel__button").addEventListener("click", () => {
        this._elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: el.id,
            bubbles: true,
          })
        );
      });
      carouselInner.append(slide);
    });

    this._elem.append(carouselInner);
    this.initCarousel();
  }

  initCarousel() {
    this.container = this._elem.querySelector(".carousel__inner");
    this.listSlides = this._elem.querySelectorAll(".carousel__slide");
    this.btnNext = this._elem.querySelector(".carousel__arrow_right");
    this.btnPrev = this._elem.querySelector(".carousel__arrow_left");

    this.btnPrev.style.display = "none";

    this.btnNext.addEventListener("click", () => {
      this._count++;
      this.updateCarousel();
    });
    this.btnPrev.addEventListener("click", () => {
      this._count--;
      this.updateCarousel();
    });
  }

  updateCarousel() {
    const widthSlide = this.listSlides[0].offsetWidth;

    this.btnNext.style.display =
      this._count == this.listSlides.length - 1 ? "none" : "flex";
    this.btnPrev.style.display = this._count == 0 ? "none" : "flex";

    this.container.style.transform = `translateX(-${
      this._count * widthSlide
    }px)`;
  }
}
