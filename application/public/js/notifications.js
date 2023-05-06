const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const unreadNotificationsContainer = document.querySelector('#unread-notifications');
const readNotificationsContainer = document.querySelector('#read-notifications');
const archivedNotificationsContainer = document.querySelector('#archived-notifications');
// Temporary way to display messages
const notifications = [
  {
      title: 'New message',
      message: 'You have a new message from John Doe.',
      status: 'unread'
  },
  {
      title: 'New promotion',
      message: 'Get 20% off your next purchase with code SUMMER20.',
      status: 'unread'
  },
  {
      title: 'Message from Jane Doe',
      message: 'You have a message from Jane Doe.',
      status: 'read'
  },
  {
      title: 'Account update required',
      message: 'Please update your account with a valid address and GatorPass card.',
      status: 'archived'
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

  const moveUnreadButton = document.createElement('button');
  moveUnreadButton.textContent = 'Unread';
  moveUnreadButton.classList.add('movebtn');
  moveUnreadButton.addEventListener('click', () => {
    moveCard(card, container.id, 'unread-notifications');
  });

  const moveReadButton = document.createElement('button');
  moveReadButton.textContent = 'Read';
  moveReadButton.classList.add('movebtn');
  moveReadButton.addEventListener('click', () => {
    moveCard(card, container.id, 'read-notifications');
  });

  const moveArchivedButton = document.createElement('button');
  moveArchivedButton.textContent = 'Archive';
  moveArchivedButton.classList.add('movebtn');
  moveArchivedButton.addEventListener('click', () => {
    moveCard(card, container.id, 'archived-notifications');
  });
  
  function createMoveButtons() {
    moveButtons.innerHTML = '';
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
  }

  createMoveButtons();
  
  card.appendChild(title);
  card.appendChild(message);
  card.appendChild(moveButtons);
  return card;
}

// A function to populate the containers with notifications
function populateNotificationsContainer(notifications) {
    unreadNotificationsContainer.innerHTML = '';
    readNotificationsContainer.innerHTML = '';
    archivedNotificationsContainer.innerHTML = '';
    notifications.forEach(notification => {
      if (notification.status === 'unread') {
        const card = createNotificationCard(notification, unreadNotificationsContainer);
        unreadNotificationsContainer.appendChild(card);
      } else if (notification.status === 'read') {
        const card = createNotificationCard(notification, readNotificationsContainer);
        readNotificationsContainer.appendChild(card);
      } else if (notification.status === 'archived') {
        const card = createNotificationCard(notification, archivedNotificationsContainer);
        archivedNotificationsContainer.appendChild(card);
      }
    });
}

function moveCard(card, oldContainerId, newContainerId) {
  const oldContainer = document.querySelector(`#${oldContainerId}`);
  const newContainer = document.querySelector(`#${newContainerId}`);
  const cardIndex = Array.from(oldContainer.children).indexOf(card);
  
  // Remove move buttons from the card
  const moveButtons = card.querySelector('.move-buttons');
  if (moveButtons) {
    moveButtons.remove();
  }

  // Remove card from old container and insert it into new container
  oldContainer.removeChild(card);
  newContainer.insertBefore(card, newContainer.children[cardIndex]);

  // Add new move buttons to the card
  const moveButtonsContainer = document.createElement('div');
  moveButtonsContainer.classList.add('move-buttons');

  const moveUnreadButton = document.createElement('button');
  moveUnreadButton.textContent = 'Unread';
  moveUnreadButton.classList.add('movebtn');
  moveUnreadButton.addEventListener('click', () => {
    moveCard(card, newContainerId, 'unread-notifications');
  });

  const moveReadButton = document.createElement('button');
  moveReadButton.textContent = 'Read';
  moveReadButton.classList.add('movebtn');
  moveReadButton.addEventListener('click', () => {
    moveCard(card, newContainerId, 'read-notifications');
  });

  const moveArchivedButton = document.createElement('button');
  moveArchivedButton.textContent = 'Archive';
  moveArchivedButton.classList.add('movebtn');
  moveArchivedButton.addEventListener('click', () => {
    moveCard(card, newContainerId, 'archived-notifications');
  });

  if (newContainerId === 'unread-notifications') {
    moveButtonsContainer.appendChild(moveReadButton);
    moveButtonsContainer.appendChild(moveArchivedButton);
  } else if (newContainerId === 'read-notifications') {
    moveButtonsContainer.appendChild(moveUnreadButton);
    moveButtonsContainer.appendChild(moveArchivedButton);
  } else if (newContainerId === 'archived-notifications') {
    moveButtonsContainer.appendChild(moveUnreadButton);
    moveButtonsContainer.appendChild(moveReadButton);
  }

  card.appendChild(moveButtonsContainer);
}

// Load the initial notifications
populateNotificationsContainer(notifications);

showTab(0); // Show the first tab by default