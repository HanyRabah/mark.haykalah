const teamSliderContainer = document.querySelector(".team-slider-container");
let isMouseDown = false;
let startX, scrollLeft;

// Mouse drag functionality
teamSliderContainer.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.pageX - teamSliderContainer.offsetLeft;
  scrollLeft = teamSliderContainer.scrollLeft;
});

teamSliderContainer.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

teamSliderContainer.addEventListener("mouseup", () => {
  isMouseDown = false;
});

teamSliderContainer.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - teamSliderContainer.offsetLeft;
  const walk = (x - startX) * 3; // Increased scroll speed
  teamSliderContainer.scrollLeft = scrollLeft - walk;
});

// Touch swipe functionality
let touchStartX = 0;

teamSliderContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

teamSliderContainer.addEventListener("touchmove", (e) => {
  const touchEndX = e.touches[0].clientX;
  const deltaX = touchStartX - touchEndX;
  teamSliderContainer.scrollLeft += deltaX * 2; // Increased touch swipe speed
  touchStartX = touchEndX;
});

// Prevent default vertical scrolling on touch
teamSliderContainer.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });

// Mouse wheel horizontal scrolling with faster speed
teamSliderContainer.addEventListener("wheel", (e) => {
  e.preventDefault();
  teamSliderContainer.scrollLeft += e.deltaY * 2; // Increased scroll speed
});

// Allow normal page scroll at the edges
teamSliderContainer.addEventListener("wheel", (e) => {
  const scrollLeft = teamSliderContainer.scrollLeft;
  const maxScrollLeft = teamSliderContainer.scrollWidth - teamSliderContainer.clientWidth;

  if ((scrollLeft === 0 && e.deltaY < 0) || (scrollLeft === maxScrollLeft && e.deltaY > 0)) {
    // At the start or end of the slider, allow normal page scroll
    teamSliderContainer.removeEventListener("wheel", preventDefaultScroll);
  } else {
    teamSliderContainer.addEventListener("wheel", preventDefaultScroll);
  }
});

function preventDefaultScroll(e) {
  e.preventDefault();
}
