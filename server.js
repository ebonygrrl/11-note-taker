// app requirements
const express = require('express');
const path = require('path');
const fs = require('fs');
//const activeNote = JSON.parse();

// notes db
const db = require('./db/db.json');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// configure port
const port = process.env.PORT || 3001;

// npm package
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/api', api);

app.use(express.static('public'));

// app home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// notes route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// route to fetch
app.get('/api/notes', (req, res) => res.json(db));

// server port
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
