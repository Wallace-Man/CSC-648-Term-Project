const mysql = require('mysql');
const util = require('util');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: "34.94.177.91",
    user: "root",
    password: "Jaws0044!",
    database: "restaurantdb",
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
});

connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "34.94.177.91",
//   user: "root",
//   password: "*4M3K0pOd(Y?dP?t",
//   database: "restaurantdb",
//   port: 3306

// });

// con.connect(function(err) {
 
//   if (err) throw err;
//   console.log("Connected!");
// });
// module.exports = {con};