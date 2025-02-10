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

// checkbox choise
function onlyOne(checkbox) {
	document.querySelectorAll('input[name="subject"]').forEach(el => {
		if (el !== checkbox) el.checked = false;
	});
}
