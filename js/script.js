new WOW().init();

// add bg color for navbar when scroll 
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});



// horizontal scrolling effect
const whyUsSection = document.querySelector('#why-us');
//const slidesContainer = document.querySelector('.slides-container');
const slides = document.querySelectorAll('.slide');

// Speed multiplier for horizontal scrolling
const scrollSpeedMultiplier = 1.5; // Reduced speed for smoother effect
let isCentered = false; // Track whether the slides-container is visible and centered

// Observe when slides-container is visible and centered
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isCentered = true; // Slides container is visible
      } else {
        isCentered = false; // Slides container is not visible
      }
    });
  },
  { threshold: 0.7 } // Trigger when 50% of the slides-container is visible
);

// Start observing the slides-container
//observer.observe(slidesContainer);

// // Add wheel event to scroll slides horizontally
// whyUsSection.addEventListener('wheel', (event) => {
//   if (!isCentered) return; // Only allow scrolling when centered

//   const atStart = slidesContainer.scrollLeft <= 0;
//   const atEnd = slidesContainer.scrollLeft + slidesContainer.clientWidth >= slidesContainer.scrollWidth - 1;

//   if (atStart && event.deltaY < 0) {
//     // Allow normal page scrolling when at the beginning and scrolling up
//     whyUsSection.removeEventListener('wheel', preventDefault);
//   } else if (atEnd && event.deltaY > 0) {
//     // Allow normal page scrolling when at the end and scrolling down
//     whyUsSection.removeEventListener('wheel', preventDefault);
//   } else {
//     // Prevent page scroll and allow horizontal slide scroll
//     event.preventDefault();
//     slidesContainer.scrollBy({
//       left: event.deltaY * scrollSpeedMultiplier,
//       behavior: 'smooth',
//     });
//     whyUsSection.addEventListener('wheel', preventDefault);
//   }
// });

// // Prevent default scrolling
// function preventDefault(event) {
//   event.preventDefault();
// }




// Creativity infinite slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".creativity .slider");

  // Clone the slides to enable seamless infinite scrolling
  const slides = Array.from(slider.children);
  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
  });

  // Infinite scrolling animation
  let position = 0;

  function slide() {
    position -= 1; // Adjust scrolling speed here
    const sliderWidth = slider.scrollWidth / 2; // Width of the original slides

    if (Math.abs(position) >= sliderWidth) {
      position = 0; // Reset position when reaching the end of original slides
    }

    slider.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(slide);
  }

  slide(); // Start the infinite scroll
});









// services slider effect

// // Select required elements
// const aslides = document.querySelectorAll("#our-services .service-slide");
// const servicesSection = document.querySelector("#our-services");
// const sliderContainer = document.querySelector(".s-container");

// let currentSlide = 0;
// const totalSlides = aslides.length;
// let isScrollingAllowed = false;
// let atTop = false;
// let atBottom = false;
// let isThrottled = false;
// const throttleDuration = 1000; // 1 second delay

// // Intersection Observer to detect when the slider section is visible
// const observerr = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     isScrollingAllowed = entry.isIntersecting;
//     if (!isScrollingAllowed) {
//       servicesSection.classList.remove("start-of-slider", "end-of-slider");
//     }
//   });
// }, { threshold: 0.6 });

// observerr.observe(sliderContainer);

// // Function to update slide classes smoothly
// function updateSlides() {
//   aslides.forEach((slide, index) => {
//     slide.classList.remove("active", "previous", "next");

//     if (index === currentSlide) {
//       slide.classList.add("active");
//     } else if (index < currentSlide) {
//       slide.classList.add("previous");
//     } else {
//       slide.classList.add("next");
//     }
//   });

//   atTop = currentSlide === 0;
//   atBottom = currentSlide === totalSlides - 1;
// }

// // Scroll Event Listener with throttling
// servicesSection.addEventListener("wheel", (event) => {
//   if (!isScrollingAllowed || isThrottled) return;

//   if (atBottom && event.deltaY > 0) {
//     servicesSection.classList.add("end-of-slider");
//     return; // Allow normal page scrolling down
//   }

//   if (atTop && event.deltaY < 0) {
//     servicesSection.classList.add("start-of-slider");
//     return; // Allow normal page scrolling up
//   }

//   event.preventDefault();
//   isThrottled = true;

//   if (event.deltaY > 0 && currentSlide < totalSlides - 1) {
//     currentSlide++;
//   } else if (event.deltaY < 0 && currentSlide > 0) {
//     currentSlide--;
//   }

//   updateSlides();

//   setTimeout(() => {
//     isThrottled = false;
//   }, throttleDuration);
// });

// // Click Event to Move to the Next or Previous Slide
// aslides.forEach((slide) => {
//   slide.addEventListener("click", () => {
//     if (slide.classList.contains("active") && currentSlide < totalSlides - 1) {
//       currentSlide++;
//     } else if (slide.classList.contains("previous") && currentSlide > 0) {
//       currentSlide--;
//     }
//     updateSlides();
//   });
// });

// // Touch support for mobile devices with throttling
// let touchStartY = 0;
// let touchEndY = 0;

// servicesSection.addEventListener("touchstart", (event) => {
//   touchStartY = event.touches[0].clientY;
// });

// servicesSection.addEventListener("touchend", (event) => {
//   if (isThrottled) return;

//   touchEndY = event.changedTouches[0].clientY;

//   if (touchStartY > touchEndY + 50 && currentSlide < totalSlides - 1) {
//     currentSlide++;
//   } else if (touchStartY < touchEndY - 50 && currentSlide > 0) {
//     currentSlide--;
//   }

//   updateSlides();

//   isThrottled = true;
//   setTimeout(() => {
//     isThrottled = false;
//   }, throttleDuration);
// });

// // Initial slide setup
// updateSlides();











// Select required elements
// const aslides = document.querySelectorAll("#our-services .service-slide");
// const servicesSection = document.querySelector("#our-services");
// const sliderContainer = document.querySelector(".s-container");

// let currentSlide = 0;
// const totalSlides = aslides.length;
// let isScrollingAllowed = false;
// let isThrottled = false;
// const throttleDuration = 1000; // 1-second delay

// // Function to disable or enable page scrolling
// function togglePageScroll(disable) {
//   if (disable) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "";
//   }
// }

// // Intersection Observer to detect when the slider section is fully visible
// const observers = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       isScrollingAllowed = entry.intersectionRatio === 1; // Fully visible
//       if (!isScrollingAllowed) {
//         servicesSection.classList.remove("start-of-slider", "end-of-slider");
//         togglePageScroll(false);
//       } else {
//         togglePageScroll(true);
//       }
//     });
//   },
//   { threshold: 1 } // 100% visibility
// );

// observers.observe(sliderContainer);

// // Function to update slide classes smoothly
// function updateSlides() {
//   aslides.forEach((slide, index) => {
//     slide.classList.remove("active", "previous", "next");

//     if (index === currentSlide) {
//       slide.classList.add("active");
//     } else if (index < currentSlide) {
//       slide.classList.add("previous");
//     } else {
//       slide.classList.add("next");
//     }
//   });

//   const atTop = currentSlide === 0;
//   const atBottom = currentSlide === totalSlides - 1;

//   if (atBottom) {
//     togglePageScroll(false); // Re-enable page scrolling when slider reaches the end
//   }
// }

// // Scroll Event Listener with throttling
// servicesSection.addEventListener("wheel", (event) => {
//   if (!isScrollingAllowed || isThrottled) return;

//   if (event.deltaY > 0 && currentSlide < totalSlides - 1) {
//     event.preventDefault();
//     currentSlide++;
//   } else if (event.deltaY < 0 && currentSlide > 0) {
//     event.preventDefault();
//     currentSlide--;
//   } else if (event.deltaY < 0 && currentSlide === 0) {
//     togglePageScroll(false); // Allow normal scrolling at the top of the slider
//   }

//   updateSlides();

//   isThrottled = true;
//   setTimeout(() => {
//     isThrottled = false;
//   }, throttleDuration);
// });

// // Touch support for mobile devices with throttling
// let touchStartY = 0;
// let touchEndY = 0;

// servicesSection.addEventListener("touchstart", (event) => {
//   touchStartY = event.touches[0].clientY;
// });

// servicesSection.addEventListener("touchend", (event) => {
//   if (isThrottled) return;

//   touchEndY = event.changedTouches[0].clientY;

//   if (touchStartY > touchEndY + 50 && currentSlide < totalSlides - 1) {
//     currentSlide++;
//   } else if (touchStartY < touchEndY - 50 && currentSlide > 0) {
//     currentSlide--;
//   } else if (touchStartY < touchEndY - 50 && currentSlide === 0) {
//     togglePageScroll(false); // Allow normal scrolling at the top of the slider
//   }

//   updateSlides();

//   isThrottled = true;
//   setTimeout(() => {
//     isThrottled = false;
//   }, throttleDuration);
// });

// // Click behavior for slides
// aslides.forEach((slide, index) => {
//   slide.addEventListener("click", () => {
//     if (index === currentSlide && currentSlide < totalSlides - 1) {
//       currentSlide++; // Move to the next slide
//     } else if (index < currentSlide) {
//       currentSlide = index; // Move to the clicked previous slide
//     }
//     updateSlides();
//   });
// });

// // Initial slide setup
// updateSlides();































// checkbox choise 
function onlyOne(checkbox) {
  document.querySelectorAll('input[name="subject"]').forEach((el) => {
    if (el !== checkbox) el.checked = false;
  });
}






// Next PAge 
// document.querySelectorAll('.accordion-item').forEach(item => { 
//   const content = item.querySelector('.accordion-content');

//   item.addEventListener('click', () => {
//       // Check if the item is already active
//       const isActive = item.classList.contains('active');

//       // Close all items
//       document.querySelectorAll('.accordion-item').forEach(i => {
//           i.classList.remove('active');
//           i.querySelector('.accordion-content').style.maxHeight = null;
//       });

//       // Toggle the clicked item
//       if (!isActive) {
//           item.classList.add('active');
//           content.style.maxHeight = content.scrollHeight + "px"; // Set height dynamically
//       }
//   });
// });




