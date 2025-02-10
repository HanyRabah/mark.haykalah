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