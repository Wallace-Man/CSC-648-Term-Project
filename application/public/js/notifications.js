const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const unreadNotificationsContainer = document.querySelector('#unread-notifications');
const readNotificationsContainer = document.querySelector('#read-notifications');
const archivedNotificationsContainer = document.querySelector('#archived-notifications');
// Temporary way to display messages
const notifications = [
  {
      title: 'New message',
      message: 'You have a new message from John Doe.'
  },
  {
      title: 'New promotion',
      message: 'Get 20% off your next purchase with code SUMMER20.'
  },
  {
      title: 'Message from Jane Doe',
      message: 'You have a message from Jane Doe.'
  },
  {
      title: 'Account update required',
      message: 'Please update your account with a valid address and GatorPass card.'
  }
];

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

// A function to generate a single notification card
function createNotificationCard(notification, container) {
  const card = document.createElement('div');
  card.classList.add('notification');
  const title = document.createElement('h2');
  title.textContent = notification.title;
  const message = document.createElement('p');
  message.textContent = notification.message;
  const moveButtons = document.createElement('div');
  moveButtons.classList.add('move-buttons');
  const moveUnreadButton = document.createElement('move-btn');
  moveUnreadButton.textContent = 'Move to unread';
  moveUnreadButton.addEventListener('click', () => {
      const unreadContainer = document.querySelector('#unread-notifications');
      const cardIndex = Array.from(container.children).indexOf(card);
      container.removeChild(card);
      unreadContainer.insertBefore(card, unreadContainer.children[cardIndex]);
  });
  const moveReadButton = document.createElement('move-btn');
  moveReadButton.textContent = 'Move to read';
  moveReadButton.addEventListener('click', () => {
      const readContainer = document.querySelector('#read-notifications');
      const cardIndex = Array.from(container.children).indexOf(card);
      container.removeChild(card);
      readContainer.insertBefore(card, readContainer.children[cardIndex]);

      if (container.id === 'unread-notifications') {
        moveButtons.removeChild(moveArchivedButton);
        moveButtons.removeChild(moveReadButton);
      } else {
        moveButtons.removeChild(moveUnreadButton);
        moveButtons.removeChild(moveReadButton);
      }
      moveButtons.appendChild(moveUnreadButton);
      moveButtons.appendChild(moveArchivedButton);
  });
  const moveArchivedButton = document.createElement('move-btn');
  moveArchivedButton.textContent = 'Move to archived';
  moveArchivedButton.addEventListener('click', () => {
      const archivedContainer = document.querySelector('#archived-notifications');
      const cardIndex = Array.from(container.children).indexOf(card);
      container.removeChild(card);
      archivedContainer.insertBefore(card, archivedContainer.children[cardIndex]);

      if (container.id === 'unread-notifications') {
        moveButtons.removeChild(moveArchivedButton);
        moveButtons.removeChild(moveReadButton);
      } else {
        moveButtons.removeChild(moveArchivedButton);
        moveButtons.removeChild(moveUnreadButton);
      }
      moveButtons.appendChild(moveUnreadButton);
      moveButtons.appendChild(moveReadButton);
    
  });
  if (container.id === 'unread-notifications') {
      moveButtons.appendChild(moveReadButton);
      moveButtons.appendChild(moveArchivedButton);
  } else if (container.id === 'read-notifications') {
      moveButtons.appendChild(moveUnreadButton);
      moveButtons.appendChild(moveArchivedButton);
  } else if (container.id === 'archived-notifications') {
      moveButtons.appendChild(moveUnreadButton);
      moveButtons.appendChild(moveReadButton);
  }
  card.appendChild(title);
  card.appendChild(message);
  card.appendChild(moveButtons);
  return card;
}

// A function to populate the containers with notifications
function populateNotificationsContainer(container, notifications) {
    container.innerHTML = '';
    notifications.forEach(notification => {
        const card = createNotificationCard(notification, container);
        container.appendChild(card);
    });
}

// Load the initial notifications
populateNotificationsContainer(unreadNotificationsContainer, notifications.slice(0, 2));
populateNotificationsContainer(readNotificationsContainer, notifications.slice(2, 3));
populateNotificationsContainer(archivedNotificationsContainer, notifications.slice(3));

showTab(0); // Show the first tab by default