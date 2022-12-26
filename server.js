// app modules
const express = require('express');
const path = require('path');
const fs = require('fs');

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
app.get('/api/notes', (req, res) => {
    // GET instant updates
    const readFs = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    res.status(200).json(readFs);
});

//POST notes route
app.post('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// POST to db / route to fetch
app.post('/api/notes', (req, res) => {

    // add id to constructor
    const note = {
        id: uuid(),
        title: req.body.title,
        text: req.body.text,
    };

    // get db file
    const readFs = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    // add note to db array
    readFs.push(note);

    // save file
    fs.writeFileSync('./db/db.json', JSON.stringify(readFs, null, 4));

    // update json
    res.status(200).json(readFs);
});

// delete route
app.delete('/api/notes/:id', function (req, res) {
    res.send('DELETE request called');

    let thisId;
    let idParam = req.params.id;
        
    // read JSON file
    const readFs = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));    

    for(let i=0; i < readFs.length; i++) {

        // get index of list item
        if(readFs[i].id === idParam) {
            thisId = i;
        }
    }

    // remove object from data array
    readFs.splice(thisId, 1); 
    
    // overwrite existing db with updated info
    fs.writeFileSync('./db/db.json', JSON.stringify(readFs, null, 4));
    
    // update json
    res.status(200).json(readFs);
});

// server port
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
