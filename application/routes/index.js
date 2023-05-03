const express = require('express');
const router = express.Router();

/* GET HOME PAGE */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET ABOUT US PAGE */
router.get('/aboutUs', function(req, res) {
  res.render('aboutUs');
});

/* GET ABOUT US-DYLAN PAGE */
router.get('/learnMoreDylan', function(req, res) {
    res.render('learnMoreDylan');
});

/* GET ABOUT US-TIM PAGE */
router.get('/learnMoreTim', function(req, res) {
    res.render('learnMoreTim');
});

/* GET ABOUT US-JEREMIAH PAGE */
router.get('/learnMoreJeremiah', function(req, res) {
    res.render('learnMoreJeremiah');
});

/* GET ABOUT US-KEVIN PAGE */
router.get('/learnMoreKevin', function(req, res) {
    res.render('learnMoreKevin');
});

/* GET ABOUT US-WALLACE PAGE */
router.get('/learnMoreWallace', function(req, res) {
    res.render('learnMoreWallace');
});

/* GET ABOUT US-CHRISTIAN PAGE */
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

/* GET DRIVER PAGE */
router.get('/driver', function(req, res) {
    res.render('driver');
});

/* GET DRIVER INFO PAGE */
router.get('/driverInfo', function(req, res) {
    res.render('driverInfo');
});

 /* GET RESTAURANT PAGE */
 router.get('/restaurant', function(req, res) {
     res.render('restaurant');
 });

 /* GET RESTAURANT INFO PAGE */
 router.get('/restaurantInfo', function(req, res) {
     res.render('restaurantInfo');
 });

 /* GET CONFIRMATION PAGE */
 router.get('/confirmation' , function(req, res){
     res.render('confirmation')
 })

  /* GET CART PAGE */
  router.get('/cart' , function(req, res){
    res.render('cart')
})

 /* GET ORDER STATUS PAGE */
 router.get('/orderStatus' , function(req, res){
    res.render('orderStatus')
})

/* GET ORDER MANAGEMENT PAGE */
router.get('/manageorder', (req, res) => {
   res.render('manageOrder');
});

  /* GET RESTURANT MENU PAGE */
  router.get('/restaurantMenuPage', (req, res) => {
    res.render('restaurantMenuPage');
  }); 

/* GET RESTURANT ACCOUNT PAGE */
router.get('/restaurantAccount', (req, res) => {
    res.render('restaurantAccount');
}); 

  /* GET DRIVER ACCOUNT PAGE */
router.get('/driverAccount', (req, res) => {
    res.render('driverAccount');
});

  /* GET USER ACCOUNT PAGE */
router.get('/userAccount', (req, res) => {
    res.render('userAccount');
}); 

/* GET HELP PAGE */
router.get('/help', (req, res) => {
    res.render('help');
}); 
  
module.exports = router;
