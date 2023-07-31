const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const port = 3000;

const eventsFilePath = path.join(__dirname, 'data', 'events.json');
const publicDirectory = path.join(__dirname, 'public');

app.use(bodyParser.json());
app.use(express.static(publicDirectory));

app.post('/submitEventData', (req, res) => {
  const eventData = req.body;

  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading events data');
    } else {
      let events = [];
      if (data) {
        events = JSON.parse(data);
      }
      events.push(eventData);

      fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
        if (err) {
          res.status(500).send('Error writing events data');
        } else {
          res.send('Event data saved successfully!');
        }
      });
    }
  });
});

app.get('/getEventData', (req, res) => {
  fs.readFile(eventsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading events data');
    } else {
      const events = JSON.parse(data);
      res.json(events);
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'host.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
