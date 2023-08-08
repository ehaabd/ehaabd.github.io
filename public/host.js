function saveEventData(event) {
  event.preventDefault();

  const location = document.getElementById('location').value;
  const lengthOfEvent = document.getElementById('lengthOfEvent').value;
  const eventTime = document.getElementById('eventTime').value;
  const whoShouldCome = document.getElementById('whoShouldCome').value;
  const contactEmail = document.getElementById('contactEmail').value;

  const eventData = {
    location,
    lengthOfEvent,
    eventTime,
    whoShouldCome,
    contactEmail,
  };

  fetch('/submitEventData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      alert('Event data saved successfully!');
      loadEventData();
    })
    .catch((error) => {
      console.error('Error saving event data:', error);
      alert('Error saving event data. Please try again later.');
    });
}

function loadEventData() {
  fetch('/getEventData')
    .then((response) => response.json())
    .then((data) => {
      const eventDataDisplay = document.getElementById('eventDataDisplay');

      eventDataDisplay.innerHTML = ''; // Clear existing data to refresh the display

      for (const event of data) {
        const eventElement = document.createElement('div');
        eventElement.innerHTML = `
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Length of Event:</strong> ${event.lengthOfEvent}</p>
          <p><strong>Event Time:</strong> ${event.eventTime}</p>
          <p><strong>Who Should Come:</strong> ${event.whoShouldCome}</p>
          <p><strong>Contact Email:</strong> ${event.contactEmail}</p>
          <hr>
        `;
        eventDataDisplay.appendChild(eventElement);
      }
    })
    .catch((error) => {
      console.error('Error loading event data:', error);
    });
}

// Add the event listener after the loadEventData() call
document.getElementById('eventForm').addEventListener('submit', saveEventData);

loadEventData();
