const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/aboutUs', function(req, res) {
  res.render('aboutUs');
});

router.get('/learnMoreDylan', function(req, res) {
    res.render('learnMoreDylan');
});

router.get('/learnMoreTim', function(req, res) {
    res.render('learnMoreTim');
});

router.get('/learnMoreJeremiah', function(req, res) {
    res.render('learnMoreJeremiah');
});

router.get('/learnMoreKevin', function(req, res) {
    res.render('learnMoreKevin');
});

router.get('/learnMoreWallace', function(req, res) {
    res.render('learnMoreWallace');
});

router.get('/learnMoreChristian', function(req, res) {
    res.render('learnMoreChristian');
});


module.exports = router;
