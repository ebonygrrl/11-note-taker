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

        // read JSON file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            // check for errors first
            if (err) {
                console.log('ERROR: ' + err);
            } else {

                // parse data from read file    
                const parsedNotes = JSON.parse(data); // Convert string into JSON object/
                
                parsedNotes.push(newNote); // add newNote to JSON array/

                const noteStr = JSON.stringify(parsedNotes, null, 4);

                // overwrite existing db with updated info
                fs.writeFile('./db/db.json', noteStr, (writeErr) => {
                    err ? console.log(writeErr) : console.log('Note has been successfully added!');
                });
            }
        });

        //get info from server if posted
        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);

    } else {
        res.status(500).json('Error in posting review');
    }
});

// delete route
app.delete('/api/notes/:id', function (req, res) {
    res.send('DELETE request called');

    const currId = req.params.id;
    let output,getId;
    console.log(currId);
        
    // read JSON file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        // check for errors first
        if (err) {
            console.log('ERROR: ' + err);
        } else {
            let newData = JSON.parse(data);
            //console.log(newData.length);

            for (let i=0; i < newData.length; i++) {
                const thisId = newData[i].id;                
                    
                //console.log(thisId);
                //console.log('WE MATCH!');
                function isNote(prop) {
                    return prop.id === thisId;
                }
            }

            getId = newData.findIndex(isNote); // get index of object with matching id
            output = newData.splice(getId, 1); // remove object from data array
            //console.log(getId);
            //console.log(JSON.stringify(newData, null, 4)); // item removed

            const noteStr = JSON.stringify(newData, null, 4);
            
            // overwrite existing db with updated info
            fs.writeFile('./db/db.json', noteStr, (writeErr) => {
                err ? console.log(writeErr) : console.log('Note has been successfully added!');
            });
        }
    });
});

// server port
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
