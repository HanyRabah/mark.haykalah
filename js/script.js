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
// const whyUsSection = document.querySelector("#why-us");
// //const slidesContainer = document.querySelector('.slides-container');
// const slides = document.querySelectorAll(".slide");

// // Speed multiplier for horizontal scrolling
// const scrollSpeedMultiplier = 1.5; 
// let isCentered = false; 

// // Observe when slides-container is visible and centered
// const observer = new IntersectionObserver(
// 	entries => {
// 		entries.forEach(entry => {
// 			if (entry.isIntersecting) {
// 				isCentered = true; // Slides container is visible
// 			} else {
// 				isCentered = false; // Slides container is not visible
// 			}
// 		});
// 	},
// 	{ threshold: 0.7 } // Trigger when 50% of the slides-container is visible
// );


// Creativity infinite slider
document.addEventListener("DOMContentLoaded", () => {
	const slider = document.querySelector(".creativity .slider");

	// Clone the slides to enable seamless infinite scrolling
	const slides = Array.from(slider.children);
	slides.forEach(slide => {
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


// checkbox choise
function onlyOne(checkbox) {
	document.querySelectorAll('input[name="subject"]').forEach(el => {
		if (el !== checkbox) el.checked = false;
	});
}


// form validation & submission with ajax
$(document).ready(function(){
    $("#contact-form, #packageForm").submit(function(e){
        e.preventDefault();
        var form = $(this);
        var formData = form.serialize();
        var responseDiv = form.attr('id') === 'contact-form' ? "#contact-response" : "#package-response";

        $.ajax({
            type: "POST",
            url: "submit_form.php",
            data: formData,
            dataType: "json",
            success: function(response){
                // $(responseDiv).html('<p class="alert alert-success">' + response.message + '</p>');
				if (response.success) {
					$(responseDiv).html('<p class="alert alert-success">' + response.message + '</p>');
					form[0].reset(); // Clear form after success
				}
            },
			error: function(){
                $(responseDiv).html('<p class="alert alert-danger">Submission failed. Please try again.' + response.message + '</p>');
            }
			
        });
    });
});