const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const readAndParseData = () => {
    const data = fs.readFileSync(path.join(__dirname, '../../db/db.json'), 'utf8');
    return JSON.parse(data);
  };
  
  const writeData = (data) => {
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(data), 'utf8');
  };
  
  router.get('/api/notes', (req, res) => {
    const data = readAndParseData();
    res.json(data);
  });
  
  router.post('/api/notes', (req, res) => {
    const data = readAndParseData();
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: Date.now(),
    };
    data.push(newNote);
    writeData(data);
    res.json(newNote);
  });
  
  router.delete('/api/notes/:id', (req, res) => {
    const data = readAndParseData();
    const noteId = parseInt(req.params.id);
    const updatedData = data.filter((note) => note.id !== noteId);
    writeData(updatedData);
    res.json({ message: `Note with id ${noteId} deleted.` });
  });
  
  module.exports = router;