const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'About Us' });
});

router.get('/learnMore', function(req, res) {
  res.render('learnMore', { title: 'Personal Profile' });
});

router.get('/learnMoreDylan', function(req, res) {
  res.render('learnMoreDylan', { title: 'Personal Profile' });
});

router.get('/learnMoreTim', function(req, res) {
  res.render('learnMoreTim', { title: 'Personal Profile' });
});

router.get('/learnMoreJeremiah', function(req, res) {
  res.render('learnMoreJeremiah', { title: 'Personal Profile' });
});

router.get('/learnMoreKevin', function(req, res) {
  res.render('learnMoreKevin', { title: 'Personal Profile' });
});

router.get('/learnMoreWallace', function(req, res) {
  res.render('learnMoreWallace', { title: 'Personal Profile' });
});

router.get('/learnMoreChristian', function(req, res) {
  res.render('learnMoreChristian', { title: 'Personal Profile' });
});

module.exports = router;
