var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

//get
router.get("/", async function (req, res, next) {
	try {
		const results = await db(`SELECT * FROM places ORDER BY id ASC;`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});
//post

router.post("/", async function (req, res, next) {
	const { name, age, type, description, address, longitude, latitude } =
		req.body;

	try {
		await db(
			`INSERT INTO places (name, age, type, description, address, longitude, latitude) VALUES ("${name}", ${age}, "${type}", "${description}"," ${address}", "${longitude}"," ${latitude}")`
		);
		const results = await db("SELECT * FROM places ORDER BY id ASC;");
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// `INSERT INTO places (name, age, type, description, address, longitude, latitude) VALUES ("{name}", 2, "{type}", "{description}"," {address}", 42.23984758, 2.397608987)

//delete
//for admin
router.delete("/:id", async function (req, res, next) {
	const { id } = req.params;

	try {
		await db(`DELETE FROM places WHERE id = "${id}";`);
		res.send({ message: "activity deleted" });
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
