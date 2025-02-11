// Initialize WOW.js
// new WOW().init();

if (typeof WOW !== "undefined") {
	new WOW().init();
}

document.addEventListener("DOMContentLoaded", () => {
	// Navbar Scroll Behavior
	const navbar = document.getElementById("navbar");
	if (navbar) {
		window.addEventListener("scroll", function () {
			if (window.scrollY > 200) {
				navbar.classList.add("scrolled");
			} else {
				navbar.classList.remove("scrolled");
			}
		});
	}

	// Swiper Initialization
	const swiperContainer = document.querySelector(".mySwiper");
	if (swiperContainer) {
		var swiper = new Swiper(".mySwiper", {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			keyboard: {
				enabled: true,
			},
			coverflowEffect: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			},
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 60,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 50,
				},
			},
		});
	}
	// Checkbox Choice Handling
	const checkboxes = document.querySelectorAll('input[name="subject"]');
	if (checkboxes.length) {
		checkboxes.forEach(checkbox => {
			checkbox.addEventListener("change", function () {
				checkboxes.forEach(el => {
					if (el !== checkbox) el.checked = false;
				});
			});
		});
	}

	// Counter Animation (Only if counter elements exist)
	const counters = document.querySelectorAll(".counter");
	if (counters.length) {
		const speed = 100; // Lower = Faster

		const observer = new IntersectionObserver(
			(entries, observer) => {
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
			},
			{ threshold: 0.5 }
		);

		counters.forEach(counter => observer.observe(counter));
	}

	// Accordion (Only if accordion items exist)
	const accordionItems = document.querySelectorAll(".accordion-item");
	if (accordionItems.length) {
		accordionItems.forEach(item => {
			const content = item.querySelector(".accordion-content");
			if (content) {
				item.addEventListener("click", () => {
					const isActive = item.classList.contains("active");

					// Close all items
					accordionItems.forEach(i => {
						i.classList.remove("active");
						const iContent = i.querySelector(".accordion-content");
						if (iContent) iContent.style.maxHeight = null;
					});

					// Toggle the clicked item
					if (!isActive) {
						item.classList.add("active");
						content.style.maxHeight = content.scrollHeight + "px"; // Set height dynamically
					}
				});
			}
		});
	}

	// Benefits Section Slider (Only initialize if elements exist)
	const sliderText = document.getElementById("sliderText");
	const nextBtn = document.getElementById("nextBtn");
	const prevBtn = document.getElementById("prevBtn");

	if (sliderText && nextBtn && prevBtn) {
		const slides = JSON.parse(sliderText.getAttribute("data-slides"));
		let currentIndex = 0;

		const changeSlide = direction => {
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

// Form validation & submission with AJAX (jQuery required)
$(document).ready(function () {
	$("#contact-form, #packageForm").submit(function (e) {
		e.preventDefault();
		var form = $(this);
		var formData = form.serialize();
		var responseDiv = form.attr("id") === "contact-form" ? "#contact-response" : "#package-response";

		console.log("Submitting form:", form.attr("id"));
		console.log("Response div:", responseDiv);

		$.ajax({
			type: "POST",
			url: "submit_form.php",
			data: formData,
			dataType: "json",
			contentType: "application/x-www-form-urlencoded",
			success: function (response) {
				console.log("Response received:", response);
				if ($(responseDiv).length === 0) {
					console.error("Response div not found:", responseDiv);
					return;
				}

				if (response.status === "success") {
					$(responseDiv).html('<p class="alert alert-success">' + response.message + "</p>");
					form[0].reset();
				} else {
					$(responseDiv).html('<p class="alert alert-danger">' + response.message + "</p>");
				}
			},
			error: function () {
				console.error("Ajax error occurred");
				$(responseDiv).html(
					'<p class="alert alert-danger">Submission failed. Please try again.' + response.message + "</p>"
				);
			},
		});
	});
});
