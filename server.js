// app modules
const express = require('express');
const path = require('path');
const fs = require('fs');

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

//POST notes route
app.post('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// POST to db / route to fetch
app.post('/api/notes', (req, res) => {

    // destructure assignment for items in req.body
    const { title, text } = req.body;

    // check if title and text are present
    if (title && text) {
        // add id to constructor
        const newNote = {
            id: uuid(),
            title,
            text,
        };
        
        //console.log(req.body=newNote);
        //const addNote = JSON.stringify(newNote);

        // need to append to an array in db


        fs.readFile('./db/db.json', 'utf8', (err, data) => {

            console.log('just data: ' + data); // multiple line
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data); 
            console.log(parsedNotes); // single line

            // add newNote to JSON array
            parsedNotes.push(newNote);

            err ? console.log(err) : console.log('Notes has been successfully added!');

            // overwrite existing db with updated info
            fs.writeFile('./db/db.json', parsedNotes, (err) => {
                err ? console.log(err) : console.log('Note has been successfully added!');
            });
        });

        // get info from server if posted
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);

    } else {
        // uh oh
        res.status(500).json('Error in posting review');
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
