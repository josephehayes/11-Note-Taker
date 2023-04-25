const path = require('path');
const router = require('express').Router();
const apiroutes = require('./API');
router.use('/api', apiroutes);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

module.exports = router;