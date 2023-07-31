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
        console.log(data); // Output the response from the server
        alert('Event data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving event data:', error);
        alert('Error saving event data. Please try again later.');
      });
  }
  