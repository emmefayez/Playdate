var express = require("express");
// const emailGuard = require('../guards/emailGuard');
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

var router = express.Router();
var jwt = require("jsonwebtoken");
// const userIdGuard = require("../guards/userIdGuard");
const db = require("../model/helper");
var bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const supersecret = process.env.SUPER_SECRET;

router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
	try {
		const results = await db(`SELECT * FROM users WHERE id="${req.user_id}";`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});
//Get list of users
router.get("/", async function (req, res, next) {
	console.log(req.user_id);
	try {
		const results = await db("SELECT * FROM users ORDER BY id ASC;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

//GET a specific user - I am using this method to show an user in the User component (Myprofile page)
//probably you will not need this once auth is incorporeted into the project
router.get("/:id", async function (req, res, next) {
	try {
		const { id } = req.params;
		const results = await db(`SELECT * FROM users WHERE id="${id}";`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// REGISTER USER
router.post("/register", async function (req, res, next) {
	const { avatar, name, email, password } = req.body;

	try {
		const hash = await bcrypt.hash(password, saltRounds);

		await db(
			`INSERT INTO users (avatar, name, email, password) VALUES ('${avatar}','${name}', '${email}', '${hash}');`
		);

		res.status(201).send({ message: "User created!" });
	} catch (err) {
		res.status(500).send(err);
	}
});

//USE LOG IN
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log("login");
	try {
		const results = await db(`SELECT * FROM users WHERE email = "${email}"`);
		const user = results.data[0];
		if (user) {
			const user_id = user.id;

			const correctPassword = await bcrypt.compare(password, user.password);

			if (!correctPassword) throw new Error("Incorrect password");

			var token = jwt.sign({ user_id }, supersecret);
			res.send({ message: "Login successful, here is your token", token });
		} else {
			throw new Error("User does not exist");
		}
	} catch (err) {
		console.log(err.message);
		res.send({ message: err.message });
	}
});

//DELETE PROFILE
router.delete("/:id", async function (req, res, next) {
	const id = req.params.id;
	console.log(id);

	try {
		await db(`DELETE FROM users WHERE id ="${id}";`);
		res.send({ message: "Profile deleted" });
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

//UPDATE USER PROFILE
router.put("/:id", async function (req, res, next) {
	const { id } = req.params;
	const { name, email, password, repeat_password } = req.body;

	try {
		await db(
			`UPDATE users SET name='${name}' email='${email}' password='${password}' repeat_password='${repeat_password}' avatar='${avatar}' WHERE id=${Number(
				id
			)}`
		);
		res.status(200).send({ message: "Profile updated" });
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

// router.get("/testing", (req, res) => {

// 	res.send({
// 		message: "Here is the PROTECTED data for user ",
// 	});
// });

module.exports = router;
