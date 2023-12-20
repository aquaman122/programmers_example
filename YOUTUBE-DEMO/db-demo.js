// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Youtube',
  dateStrings: true
});

// simple query
connection.query(
  'SELECT * FROM `users`',
  function(err, results, fields) {
    let {id, email, name, contact, created_at} = results[results.length - 1] // results contains rows returned by server
    console.log(id);
    console.log(email);
    console.log(name);
    console.log(contact);
    console.log(created_at);
  }
);

// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );