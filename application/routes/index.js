const express = require('express');
const router = express.Router();

/* GET HOME PAGE */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET ABOUTUS PAGE */
router.get('/aboutUs', function(req, res) {
  res.render('aboutUs');
});

/* GET ABOUTUS-DYLAN PAGE */
router.get('/learnMoreDylan', function(req, res) {
    res.render('learnMoreDylan');
});

/* GET ABOUTUS-TIM PAGE */
router.get('/learnMoreTim', function(req, res) {
    res.render('learnMoreTim');
});

/* GET ABOUTUS-JEREMIAH PAGE */
router.get('/learnMoreJeremiah', function(req, res) {
    res.render('learnMoreJeremiah');
});

/* GET ABOUTUS-KEVIN PAGE */
router.get('/learnMoreKevin', function(req, res) {
    res.render('learnMoreKevin');
});

/* GET ABOUTUS-WALLACE PAGE */
router.get('/learnMoreWallace', function(req, res) {
    res.render('learnMoreWallace');
});

/* GET ABOUTUS-CHRISTIAN PAGE */
router.get('/learnMoreChristian', function(req, res) {
    res.render('learnMoreChristian');
});

/* GET LOGIN PAGE */
router.get('/login', function(req, res) {
    res.render('login');
});

/* GET SIGNUP PAGE */
router.get('/signup', function(req, res) {
    res.render('signup');
});

/* GET ToS PAGE */
router.get('/termsOfService', function(req, res) {
    res.render('termsOfService');
});

/* GET SIGNUP PAGE */
router.get('/privacyPolicy', function(req, res) {
    res.render('privacyPolicy');
});

/* GET ERROR PAGE */
router.get('/error', function(req, res, next) {
    const error = new Error('Something went wrong');
    error.status = 500;
    next(error);
});

module.exports = router;
