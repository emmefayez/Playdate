require("dotenv").config();
const mysql = require("mysql");
const ImportedActivities = require("./ImportedActivites");

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

const presetActivities = [
	{
		name: "Piggy bank",
		age: 1,
		description: `A Montessori activity that will aid the motor development of your baby. Preferably indoor, on a carpet. You will need a box not bigger than 20cmx20cm if it is possible. choose a box with a separate top. Make a little cleft, wide enough to make it possible to insert a token/chip. You may create tokens with paper or pasta! Show your kid how you put the token in the box and make an 'Oooh' when the token reaches the bottom of the box. Let your baby try alone!`,
	},
	{
		name: "Change your glasses",
		age: 8,
		description:
			"This is a very simple outdoor exercise to do with your children to foster their empathy and imagination skills. If you have any, give your kid/s an old pair of glasses, or make some fake ones with the materials you have at home. Go to a place where they are familiar, but before arriving explain the rules of the game: they have to imagine visiting this place for the first time as someone else. Invite them to write on a block-notes what they will do/ what they will notice. You can decide to land them your phone to take pictures from the point of view of this 'stranger'. Once at home, ask them to go through the picture and with the rest of the family, you have to guess who is this stranger.",
	},
	{
		name: "Tidy up!",
		age: 2,
		description:
			"A Montessori activity based on symbolic playing - it can be done outdoor with other materials. Children love to imitate the behaviour and actions of adults: take advantage of this innate behaviour to foster the independence and self-esteem of your kid. For this activity, you will need a bag full of paper cuts and a handkerchief. Make a circle on the floor with the handkerchief, throw inside the circle the paper cuts and show your kid how to put everything back in the bag. Then throw everything again and let they to tidy up!",
	},
	{
		name: "Speech bubbles",
		age: 10,
		description:
			"This activity is suitable for groups but can be done also by just you and your kid. You will need a worksheet, paper and pen and glue and to prepare some images representing a topic you want to address to your children. Print them ensuring there are 2 copies of each at least. Ask your kid/s to look at each picture and answer these questions about it on the worksheet: Who? What? Where? When? How? Do the same. Then glue the picture onto the worksheet. Make speech bubbles for the characters in the picture to say something, and write in what they are saying. Display everything on a wall or table, placing the side of the same picture by side for comparison. Ask the children to look at all the pictures and read their speech bubbles. Debrief the activity by asking questions such as these: How hard was it to answer the questions about the pictures? To write speech bubbles? How did your analysis of the same picture compare with the analysis of the other pair? What stereotypes did people find in the pictures? In the speech bubbles?",
	},
];

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");

	let activities = `DROP TABLE if exists activities; 
	CREATE TABLE activities (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	age INT,
	description TEXT,
	PRIMARY KEY (id)
); 
  INSERT INTO activities (name, age, description) VALUES ("${presetActivities[0].name}","${presetActivities[0].age}","${presetActivities[0].description}"),("${presetActivities[1].name}","${presetActivities[1].age}","${presetActivities[1].description}"),("${presetActivities[2].name}","${presetActivities[2].age}","${presetActivities[2].description}"),("${presetActivities[3].name}","${presetActivities[3].age}","${presetActivities[3].description}");



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
		latitude INT,
		longitude INT,
	
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
