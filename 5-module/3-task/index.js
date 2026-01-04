function initCarousel() {
  const container = document.querySelector(".carousel__inner");
  const listSlides = document.querySelectorAll(".carousel__slide");
  const btnNext = document.querySelector(".carousel__arrow_right");
  const btnPrev = document.querySelector(".carousel__arrow_left");
  const widthSlide = listSlides[0].offsetWidth;
  let count = 0;
  btnPrev.style.display = "none";

  btnNext.addEventListener("click", slideOffsetNext);
  btnPrev.addEventListener("click", slideOffsetPrev);

  function slideOffsetNext() {
    count++;
    updateCarousel();
  }

  function slideOffsetPrev() {
    count--;
    updateCarousel();
  }

  function updateCarousel() {
    btnNext.style.display = count == listSlides.length - 1 ? "none" : "flex";
    btnPrev.style.display = count == 0 ? "none" : "flex";

    container.style.transform = `translateX(-${count * widthSlide}px)`;
  }
}
