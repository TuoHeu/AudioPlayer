const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const tracks = {};

const mentalStates = ['focus', 'relax', 'sleep'];

mentalStates.forEach(state => {
  tracks[state] = [];
  const stateFolderPath = path.join(__dirname, 'assets', state);

  fs.readdirSync(stateFolderPath).forEach((file, index) => {
    const filePath = path.join(stateFolderPath, file);
    tracks[state].push({
      id: index,
      name: `${state.charAt(0).toUpperCase() + state.slice(1)} Track ${
        index + 1
      }`,
      url: `${state}${index + 1}`, //`/${state}/${file}`,
    });

    app.get(tracks[state][index].url, (req, res) => {
      res.sendFile(filePath);
    });
  });
});

app.get('/tracks/:state', (req, res) => {
  const state = req.params.state;
  if (tracks[state]) {
    res.json({tracks: tracks[state]});
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
