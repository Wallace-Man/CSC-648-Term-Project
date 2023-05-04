const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

function showTab(tabIndex) {
  tabContents.forEach(tabContent => {
    tabContent.classList.remove('active');
  });
  tabContents[tabIndex].classList.add('active');

  tabButtons.forEach(tabButton => {
    tabButton.classList.remove('active');
  });
  tabButtons[tabIndex].classList.add('active');
}

tabButtons.forEach((tabButton, index) => {
  tabButton.addEventListener('click', () => {
    showTab(index);
  });
});

showTab(0); // Show the first tab by default