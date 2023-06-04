/*
 * This script handles the functionality of expanding and collapsing FAQ panels on the driver information page.
 * When a faq element is clicked, it toggles the "active" class on the element to highlight the button that controls the panel.
 * It also toggles the display of the next sibling element, showing or hiding the panel content.
 */

const faq = document.getElementsByClassName("faq-page");

// Iterate through each faq element
for (let i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function() {
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
