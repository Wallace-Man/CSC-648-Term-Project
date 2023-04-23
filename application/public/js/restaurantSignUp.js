/** 
* This file contains the JavaScript code to render and interact with the restaurant sign up page. 
* 
* The main functionality of the application includes: 
*   - When the page is rendered, the FAQ will have interactable buttons where the user can display the answers
*   - When the user submits the form, it will go the next page which is the restaurantInfo page
*   - TODO: Get all the information from the form fields and POST them to the db 
*/
const restaurantForm = document.getElementById("restaurant-form");
const faq = document.getElementsByClassName("faq-page");
restaurantForm.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "/confirmation";
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

