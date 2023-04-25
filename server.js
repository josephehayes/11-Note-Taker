const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const indexRoutes = require('./routes/apiRoutes/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', indexRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const notes = JSON.parse(data);
      const newNote = {
        id: Math.floor(Math.random() * 1000),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json(newNote);
        }
      });
    }
  });
});
//Deletion of Notes Function
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter((note) => note.id !== noteId);
      fs.writeFile('./db/db.json', JSON.stringify(filteredNotes), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ message: `Note ${noteId} deleted.` });
        }
      });
    }
  });
});

// Start the server to begin listening
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});