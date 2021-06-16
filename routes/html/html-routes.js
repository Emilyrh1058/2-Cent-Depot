const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/2cents-list.html'));
});

router.get('/add-post', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-2cents.html'));
});

router.get('/2cents', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/2cents.html'));
});

module.exports = router;