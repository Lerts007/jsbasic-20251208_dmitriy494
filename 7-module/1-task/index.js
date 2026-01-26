import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
  }

  get elem() {
    return this._elem;
  }

  render() {
    this._elem = document.createElement("div");
    this._elem.classList.add("ribbon");

    // Создаем левую кнопку
    this.btnLeft = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      `);

    this.btnLeft.addEventListener("click", (el) => {
      this.menu.scrollBy(-350, 0);
    });

    this._elem.append(this.btnLeft); // Добавляем левую кнопку

    // Создаем меню
    this.menu = document.createElement("nav");
    this.menu.classList.add("ribbon__inner");

    // Создаем элементы меню
    this.categories.forEach((el, index) => {
      const elMenu = createElement(
        `<a href="#" class="ribbon__item ${
          index == 0 ? "ribbon__item_active" : ""
        }" data-id="${el.id}">${el.name}</a>`
      );

      // отлавливаем клик
      elMenu.addEventListener("click", (element) => {
        element.preventDefault(); // останавливаем высплытие
        // находим элемент с классом active и удаляем его
        this.menu
          .querySelector(".ribbon__item_active")
          ?.classList.remove("ribbon__item_active");

        // добавляем класс active на элемент на котором был клик
        elMenu.classList.add("ribbon__item_active");
        this._elem.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: elMenu.dataset.id,
            bubbles: true,
          })
        );
      });

      this.menu.append(elMenu); // добавляем элемент в меню
    });

    this._elem.append(this.menu);

    // Создаем правую кнопку
    this.btnRight = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      `);
    this.btnRight.addEventListener("click", (el) => {
      this.menu.scrollBy(350, 0);
    });
    this._elem.append(this.btnRight); // Добавляем правую кнопку

    this.menu.addEventListener("scroll", () => {
      let scrollLeft = this.menu.scrollLeft;
      let scrollRight =
        this.menu.scrollWidth - scrollLeft - this.menu.clientWidth;

      if (scrollLeft === 0) {
        this.btnLeft.classList.remove("ribbon__arrow_visible");
      } else {
        this.btnLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        this.btnRight.classList.remove("ribbon__arrow_visible");
      } else {
        this.btnRight.classList.add("ribbon__arrow_visible");
      }
    });
  }
}
