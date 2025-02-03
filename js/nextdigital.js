document.addEventListener("DOMContentLoaded", () => {
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
});


// Accordion , services section

// document.querySelectorAll('.accordion-item').forEach(item => {
//     item.addEventListener('click', () => {
//         // Toggle Active Class
//         const isActive = item.classList.contains('active');
//         document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        
//         if (!isActive) {
//             item.classList.add('active');
//         }

//         // Toggle "+" and "X"
//         document.querySelectorAll('.accordion-item span').forEach(span => span.textContent = "+");
//         if (!isActive) {
//             item.querySelector('.accordion-header span').textContent = "X";
//         }
//     });
// });

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

