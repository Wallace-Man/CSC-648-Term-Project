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

//window.addEventListener("resize", checkWindowSize);

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

// function checkWindowSize(){
//     var windowHeight = window.innerHeight;
//     var windowWidth = window.innerWidth;

//     if (windowHeight < 500) {
//         const banner = document.querySelector('.restaurant-banner');
//         banner.style.height = 400 + 'vh';
//         console.log("change has happened");
//         // Apply styles for small window height
//         // For example:

//         // var inputs = document.querySelectorAll('input.restaurant-signup');
//         // inputs.forEach(function(input) {
//         //     input.style.padding = '8px';
//         //     input.style.padding = '1px';
//         // });
//         // var labels = document.querySelectorAll('label.restaurant-signup');
//         // labels.forEach(function(label) {
//         //     label.style.fontSize = '10px';
//         //     label.style.padding = '1px';
//         //     label.style.marginTop = '1px';
//         // });
//     } else {
//         // Apply styles for larger window height
//         // For example:
//         //document.body.style.backgroundColor = "white";
//     }
// }

