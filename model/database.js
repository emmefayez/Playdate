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
	multipleStatements: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");

	let activities = `DROP TABLE if exists activities; CREATE TABLE activities (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	age INT,
	description TEXT,
	PRIMARY KEY (id)
);
`;
	con.query(activities, function (err, result) {
		if (err) throw err;
		console.log("Table creation `activities` was successful!");

		console.log("Closing...");
	});

	let favorities = `DROP TABLE if exists favorities;CREATE TABLE favorities (
	id INT NOT NULL AUTO_INCREMENT,
	activity_id INT NOT NULL,
	user_id INT NOT NULL,
	PRIMARY KEY (id)
);
`;
	con.query(favorities, function (err, result) {
		if (err) throw err;
		console.log("Table creation `favorities` was successful!");

		console.log("Closing...");
	});

	let places = `DROP TABLE if exists places;CREATE TABLE places (
		id INT NOT NULL AUTO_INCREMENT,
		name VARCHAR(255),
		age INT,
		type TEXT,
		description TEXT,
		address TEXT,
		coordinates VARCHAR(255),
	
		PRIMARY KEY (id)
	);
	`;
	con.query(places, function (err, result) {
		if (err) throw err;
		console.log("Table creation `places` was successful!");

		console.log("Closing...");
	});

	let users = `DROP TABLE if exists users;CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	avatar VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);


`;
	con.query(users, function (err, result) {
		if (err) throw err;
		console.log("Table creation `users` was successful!");

		console.log("Closing...");
	});

	con.end();
});
