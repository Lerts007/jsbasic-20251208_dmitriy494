import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.config = {
      steps: steps,
      value: value,
    };

    this.render();
  }

  get elem() {
    return this._elem;
  }

  render() {
    this._elem = document.createElement("div");
    this._elem.classList.add("slider");

    this.sliderThumb = createElement(`
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${this.config.value}</span>
      </div>`);

    this.sliderThumb.ondragstart = () => false;

    this.renderDragAndDrop();
    this._elem.append(this.sliderThumb);

    this.sliderProgress = createElement(`
      <div class="slider__progress" style="width: 50%;"></div>
      `);
    this._elem.append(this.sliderProgress);

    this.sliderSteps = createElement(`
      <div class="slider__steps"></div>
      `);

    for (let i = 0; i < this.config.steps; i++) {
      this.sliderSteps.append(
        createElement(
          `<span class="${i == this.config.value ? "slider__step-active" : ""}"></span>`,
        ),
      );
    }

    this._elem.append(this.sliderSteps);
    this.segments = this.config.steps - 1;
  }

  update(shiftX, widthSlider) {
    const clickRatio = shiftX / widthSlider;
    let value = Math.round(clickRatio * this.segments);

    this.sliderThumb.style.left = `${Math.round(clickRatio * 100)}%`;
    this.sliderProgress.style.width = `${Math.round(clickRatio * 100)}%`;

    this.config.value = Math.max(0, Math.min(value, this.segments));

    this.sliderThumb.querySelector(".slider__value").textContent =
      this.config.value;

    this.sliderSteps
      .querySelector(".slider__step-active")
      ?.classList.remove("slider__step-active");

    this.sliderSteps.children[this.config.value].classList.add(
      "slider__step-active",
    );
  }

  renderDragAndDrop() {
    this.elem.addEventListener("pointerdown", (event) => {
      event.preventDefault();

      this.elem.classList.add("slider_dragging");

      let thumb = this.elem.querySelector(".slider__thumb"); // ползунок
      let progress = this.elem.querySelector(".slider__progress"); // прогресс
      let widthSlider = this.elem.getBoundingClientRect().width; // ширина слайдера

      thumb.ondragstart = () => false;
      let shiftX = event.clientX - this.elem.getBoundingClientRect().left;

      let moveAt = (event) => {
        shiftX = event.clientX - this.elem.getBoundingClientRect().left;
        if (shiftX > 0 && shiftX < widthSlider) {
          this.update(shiftX, widthSlider);
        }
      };

      document.body.addEventListener("pointermove", moveAt);

      let removeEvent = () => {
        this.elem.classList.remove("slider_dragging");
        document.body.removeEventListener("pointermove", moveAt);

        thumb.style.left = `${Math.round((this.config.value / this.segments) * 100)}%`;
        progress.style.width = `${Math.round((this.config.value / this.segments) * 100)}%`;

        this._elem.dispatchEvent(
          new CustomEvent("slider-change", {
            detail: this.config.value,
            bubbles: true,
          }),
        );
      };

      // Если отпустили удаляем событие
      this.elem.addEventListener("pointerup", () => {
        removeEvent();
      });
    });

    this.elem.addEventListener("click", (event) => {
      event.preventDefault();
      let widthSlider = this.elem.getBoundingClientRect().width; // ширина слайдера
      let shiftX = event.clientX - this.elem.getBoundingClientRect().left;
      this.update(shiftX, widthSlider);

      this.sliderThumb.style.left = `${Math.round((this.config.value / this.segments) * 100)}%`;
      this.sliderProgress.style.width = `${Math.round((this.config.value / this.segments) * 100)}%`;

      this._elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.config.value,
          bubbles: true,
        }),
      );
    });
  }
}
