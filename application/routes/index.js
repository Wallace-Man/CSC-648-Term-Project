const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'About Us' });
});

router.get('/learnMore', function(req, res) {
  res.render('learnMore', { title: 'Personal Profile' });
});

module.exports = router;
