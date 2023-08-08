function fetchEventData() {
  return fetch('../data/events.json')
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching event data:', error);
      return [];
    });
}

async function displayEvents() {
  var eventListContainer = document.getElementById("eventList");

  var eventData = await fetchEventData();

  eventData.forEach(function(event) {
    var eventElement = document.createElement("div");
    eventElement.className = "mb-4";
    eventElement.innerHTML = `
      <h4>Location: ${event.location}</h4>
      <p>Length of Event: ${event.lengthOfEvent}</p>
      <p>Event Time: ${event.eventTime}</p>
      <p>Who Should Come: ${event.whoShouldCome}</p>
      <p>Contact Email: ${event.contactEmail}</p>
      <hr>
    `;
    eventListContainer.appendChild(eventElement);
  });
}

displayEvents();
