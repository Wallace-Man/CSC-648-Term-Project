console.log("Script loaded successfully!");

const restaurantForm = document.getElementById("restaurant-form");
const faq = document.getElementsByClassName("faq-page");

restaurantForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form submitted");

  // Get the form data
  const formData = new FormData(restaurantForm);

  // Create an AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/restaurant");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Form submission successful");
      window.location.href = "/confirmation";
    } else {
      console.log("Form submission failed");
    }
  };
  xhr.send(new URLSearchParams(formData).toString());
});

var i;
for (i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");
    /* Toggle between hiding and showing the active panel */
    var body = this.nextElementSibling;
    if (body.style.display === "block") {
      body.style.display = "none";
    } else {
      body.style.display = "block";
    }
  });
}
