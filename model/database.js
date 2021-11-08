require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "playdate",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let activities =
    `CREATE TABLE activities (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL UNIQUE,
	age_range INT NOT NULL,
	indoor BOOLEAN NOT NULL,
	outdoor BOOLEAN NOT NULL,
	description TEXT NOT NULL,
	PRIMARY KEY (id)
);
`
  con.query(activities, function(err, result) {
    if (err) throw err;
    console.log("Table creation `activities` was successful!");

    console.log("Closing...");
  });


  let favActivities =
    `CREATE TABLE favorities_activities (
	id INT NOT NULL AUTO_INCREMENT,
	activity_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (id)
);
`
  con.query(favActivities, function(err, result) {
    if (err) throw err;
    console.log("Table creation `favorities_activities` was successful!");

    console.log("Closing...");
  });


  let users =
 `CREATE TABLE users (
	name VARCHAR(255) NOT NULL,
	id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (id)
);
`
  con.query(users, function(err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");

    console.log("Closing...");
  });


  con.end();
});
