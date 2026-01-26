import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }

  open() {
    this.body = document.querySelector("body");
    this.body.classList.add("is-modal-open");

    this.body.append(this.modal);
  }

  setTitle(value) {
    this.modal.querySelector(".modal__title").innerHTML = value;
  }

  setBody(value) {
    this.modal.querySelector(".modal__body").append(value);
  }

  render() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
      `);

    this.modal.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });
    this.modal
      .querySelector(".modal__overlay")
      .addEventListener("click", () => {
        this.close();
      });
    document.addEventListener("keydown", this.closeEsc);
  }

  close() {
    this.body.classList.remove("is-modal-open");
    this.modal.remove();
    document.removeEventListener("keydown", this.closeEsc);
  }

  closeEsc = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };
}
