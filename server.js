const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON data from the client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route to handle the /submitEventData POST request
app.post('/submitEventData', (req, res) => {
  const eventData = req.body;

  const eventDataJSON = JSON.stringify(eventData, null, 2);

  fs.writeFile(path.join(__dirname, 'events.json'), eventDataJSON, (err) => {
    if (err) {
      console.error('Error writing to events.json:', err);
      res.status(500).send('Error writing to events.json');
    } else {
      console.log('Event data saved to events.json successfully!');
      res.status(200).send('Event data saved successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
