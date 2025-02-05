document.addEventListener("DOMContentLoaded", () => {
    // Counter Animation
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // Lower = Faster

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetText = counter.getAttribute("data-target").trim();
                const hasPlus = targetText.startsWith("+"); // Check if number has '+'
                const target = parseInt(targetText.replace("+", ""), 10);
                let count = 0;

                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = (hasPlus ? "+ " : "") + Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = (hasPlus ? "+ " : "") + target;
                    }
                };

                updateCount();
                observer.unobserve(counter); // Stop observing once animation starts
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // Accordion (Services Section)
    document.querySelectorAll('.accordion-item').forEach(item => {
        const content = item.querySelector('.accordion-content');

        item.addEventListener('click', () => {
            // Check if the item is already active
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px"; // Set height dynamically
            }
        });
    });

    // Benefits Section Slider
    const sliderText = document.getElementById("sliderText");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    if (sliderText && nextBtn && prevBtn) {
        const slides = JSON.parse(sliderText.getAttribute("data-slides"));
        let currentIndex = 0;

        const changeSlide = (direction) => {
            sliderText.style.opacity = "0";
            
            setTimeout(() => {
                currentIndex = (currentIndex + direction + slides.length) % slides.length;
                sliderText.textContent = slides[currentIndex];
                sliderText.style.opacity = "1";
            }, 300);
        };

        nextBtn.addEventListener("click", () => changeSlide(1));
        prevBtn.addEventListener("click", () => changeSlide(-1));
    }
});
























// document.addEventListener("DOMContentLoaded", () => {
//     const counters = document.querySelectorAll(".counter");
//     const speed = 100; // Lower = Faster

//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const counter = entry.target;
//                 const targetText = counter.getAttribute("data-target").trim();
//                 const hasPlus = targetText.startsWith("+"); // Check if number has '+'
//                 const target = parseInt(targetText.replace("+", ""), 10);
//                 let count = 0;

//                 const updateCount = () => {
//                     const increment = target / speed;
//                     if (count < target) {
//                         count += increment;
//                         counter.innerText = (hasPlus ? "+ " : "") + Math.ceil(count);
//                         requestAnimationFrame(updateCount);
//                     } else {
//                         counter.innerText = (hasPlus ? "+ " : "") + target;
//                     }
//                 };

//                 updateCount();
//                 observer.unobserve(counter); // Stop observing once animation starts
//             }
//         });
//     }, { threshold: 0.5 });

//     counters.forEach(counter => observer.observe(counter));
// });


// // Accordion , services section
// document.querySelectorAll('.accordion-item').forEach(item => {
//     const content = item.querySelector('.accordion-content');

//     item.addEventListener('click', () => {
//         // Check if the item is already active
//         const isActive = item.classList.contains('active');

//         // Close all items
//         document.querySelectorAll('.accordion-item').forEach(i => {
//             i.classList.remove('active');
//             i.querySelector('.accordion-content').style.maxHeight = null;
//         });

//         // Toggle the clicked item
//         if (!isActive) {
//             item.classList.add('active');
//             content.style.maxHeight = content.scrollHeight + "px"; // Set height dynamically
//         }
//     });
// });


// // next strategy page , Benefits section slider
// const slides = [
//     "Gain a clear roadmap for sustainable business growth.",
//     "Strengthen client relationships and boost retention rates.",
//     "Achieve long-term competitiveness in your industry.",
//     "Leverage data-driven strategies for effective decision-making.",
//     "Align your business operations with Saudi Vision 2030 for future."
// ];

// let currentIndex = 0;
// const sliderText = document.getElementById("sliderText");

// document.getElementById("nextBtn").addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % slides.length;
//     sliderText.textContent = slides[currentIndex];
// });

// document.getElementById("prevBtn").addEventListener("click", () => {
//     currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//     sliderText.textContent = slides[currentIndex];
// });




