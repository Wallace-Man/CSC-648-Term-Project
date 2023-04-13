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
router.get('/getAllRestaurants', function(req, res, next) {
    // //grab the search term out of the request
    
    // //create the sql query
    // let query = "SELECT * FROM Restaurant";
    // //execute the sql query on the db object
    // // con.connect(function(err) {
    // //   if (err) throw err;
    //   con.query(query, function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //     //send the result back the front end
    //     res.json(result);
    //   });
    const restaurants = [
        {
          "restaurantID": 1,
          "restaurant Name": "Burger Joint",
          "website": "burgerjoint.com",
          "address": "123 Main St",
          "city": "Anytown",
          "state_": "CA",
          "zip code": "12345",
          "country": "USA",
          "open": "11AM",
          "closed": "10PM",
          "cuisine_type": "Burgers"
        },
        {
          "restaurantID": 2,
          "restaurant Name": "Pizzeria",
          "website": "pizzeria.com",
          "address": "456 Elm St",
          "city": "Anytown",
          "state_": "CA",
          "zip code": "12345",
          "country": "USA",
          "open": "11AM",
          "closed": "10PM",
          "cuisine_type": "Pizza"
        },
        {
          "restaurantID": 3,
          "restaurant Name": "Sushi Bar",
          "website": "sushibar.com",
          "address": "789 Oak St",
          "city": "Anytown",
          "state_": "CA",
          "zip code": "12345",
          "country": "USA",
          "open": "11AM",
          "closed": "10PM",
          "cuisine_type": "Japanese"
        },
        {
          "restaurantID": 4,
          "restaurant Name": "Taco Stand",
          "website": null,
          "address": "321 Maple St",
          "city": "Anytown",
          "state_": "CA",
          "zip code": "12345",
          "country": "USA",
          "open": "11AM",
          "closed": "10PM",
          "cuisine_type": "Mexican"
        }
      ];
      
    res.json(restaurants);  
  });
  
module.exports = router;
