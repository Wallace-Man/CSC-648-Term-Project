const express = require('express');
const { con } = require('../config/db');
const router = express.Router();

/* GET users listing. */
router.get('/getRestaurants', function(req, res, next) {
  //grab the search term out of the request
  let searchTerm = req.body.searchTerm;
  //create the sql query
  let query = "SELECT * FROM restaurants WHERE name LIKE %" + searchTerm + "%";
  //execute the sql query on the db object
  con.connect(function(err) {
    if (err) throw err;
    con.query(query, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      //send the result back the front end
      res.json(result);
    });
  });
});

module.exports = router;
