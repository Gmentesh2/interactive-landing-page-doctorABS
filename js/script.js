document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const viewport = carousel.querySelector(".carousel__viewport");
  const track = carousel.querySelector(".carousel__track");
  const cards = [...track.children];

  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");
  const dots = carousel.querySelector(".carousel__dots");

  let index = 0;

  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 0;
  }

  function getVisibleCards() {
    if (!cards.length) return 1;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const viewportWidth = viewport.getBoundingClientRect().width;
    const gap = getGap();

    return Math.max(1, Math.floor((viewportWidth + gap) / (cardWidth + gap)));
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - getVisibleCards());
  }

  function createDots() {
    dots.innerHTML = "";

    const amount = getMaxIndex() + 1;

    for (let i = 0; i < amount; i++) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);

      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
      });

      dots.appendChild(dot);
    }
  }

  function updateCarousel() {
    const maxIndex = getMaxIndex();

    index = Math.max(0, Math.min(index, maxIndex));

    const cardWidth = cards[0].getBoundingClientRect().width;
    const distance = cardWidth + getGap();

    track.style.transform = `translateX(-${index * distance}px)`;

    [...dots.children].forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });

    prev.disabled = index === 0;
    next.disabled = index === maxIndex;
  }

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  next.addEventListener("click", () => {
    if (index < getMaxIndex()) {
      index++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    createDots();
    updateCarousel();
  });

  createDots();
  updateCarousel();
});

function initStepsCarousel() {
  const carousel = document.querySelector('[data-carousel="steps"]');

  if (!carousel) return;

  const track = carousel.querySelector(".steps-track");
  const slides = [...carousel.querySelectorAll(".step-card")];

  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");

  const dotsContainer = carousel.querySelector(".carousel__dots");

  let currentIndex = 0;

  function createDots() {
    dotsContainer.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", `Gehe zu Schritt ${index + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    if (window.innerWidth > 1300) {
        track.style.transform = "none";
        return;
    }

    track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

    const dots = [
        ...dotsContainer.querySelectorAll("button")
    ];

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentIndex
        );
    });

    prevButton.disabled = currentIndex === 0;

    nextButton.disabled =
        currentIndex === slides.length - 1;
}

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1300) {
      track.style.transform = "none";
    } else {
      updateCarousel();
    }
  });

  createDots();
  updateCarousel();
}

initStepsCarousel();
