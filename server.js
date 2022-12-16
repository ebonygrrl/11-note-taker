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

// GET notes route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// GET database / route to fetch
app.get('/api/notes', (req, res) => res.json(db));

// POST notes route
app.post('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// POST to db / route to fetch
app.post('/api/notes', (req, res) => {

    // Destructure assignment for items in req.body
    const { title, text } = req.body;

    if(title && text) {
        const newNote = {
            id: uuid(),
            title,
            text,
        }

        const response = {
            
        }
    }
});

// delete note
// app.delete('/', function (req, res) {
//     res.send('DELETE request to homepage');
// });

// server port
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
