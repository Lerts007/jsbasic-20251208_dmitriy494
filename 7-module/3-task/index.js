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

    this.update();

    this._elem.addEventListener("click", (event) => {
      const rect = this._elem.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickRatio = clickX / rect.width;
      let value = Math.round(clickRatio * this.segments);

      this.config.value = Math.max(0, Math.min(value, this.segments));

      this.update();

      this._elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.config.value,
          bubbles: true,
        }),
      );
    });
  }

  update() {
    this.sliderThumb.style.left = `${(this.config.value / this.segments) * 100}%`;
    this.sliderProgress.style.width = `${(this.config.value / this.segments) * 100}%`;
    this.sliderThumb.querySelector(".slider__value").textContent =
      this.config.value;

    this.sliderSteps
      .querySelector(".slider__step-active")
      ?.classList.remove("slider__step-active");

    this.sliderSteps.children[this.config.value].classList.add(
      "slider__step-active",
    );
  }
}
