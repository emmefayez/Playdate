var express = require("express");
const { VariantAlsoNegotiates } = require("http-errors");
var router = express.Router();
const favoriteActivityIdGuard = require("../guards/favoriteActvityIdGuard");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const db = require("../model/helper");

/* GET activities listing. */
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
	try {
		const results = await db(
			`SELECT favorities.id, favorities.user_id, favorities.activity_id, activities.age, activities.name, activities.description FROM favorities join activities on favorities.activity_id = activities.id WHERE user_id = ${req.user_id}; `
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

// `SELECT favorities.id, favorities.user_id, activities.id, activities.age, activities.name, activities.description FROM favorities join activities on favorities.activity_id = activities.id WHERE user_id = 3; `
// select * from bookings left join users on bookings.userId = users.id ;

//ADD activity to favorities
router.post(
	"/",
	// favoriteActivityIdGuard,
	userShouldBeLoggedIn,
	async function (req, res, next) {
		const { activity_id } = req.body;

		try {
			await db(
				`INSERT INTO favorities (activity_id, user_id) VALUES (${activity_id}, ${req.user_id})`
			);
			const results = await db(
				`SELECT * FROM favorities WHERE user_id = ${req.user_id}`
			);
			res.send(results.data);
		} catch (err) {
			res.status(500).send(err);
		}
	}
);

//DELETE an activity from fav
router.delete("/", userShouldBeLoggedIn, async function (req, res, next) {
	const { activity_id } = req.body;

	try {
		await db(
			`DELETE FROM favorities WHERE activity_id = ${activity_id} AND user_id = ${req.user_id};`
		);
		const results = await db(
			`SELECT favorities.id, favorities.user_id, favorities.activity_id, activities.age, activities.name, activities.description FROM favorities join activities on favorities.activity_id = activities.id WHERE user_id = ${req.user_id};`
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

//GET list of fav activities filtered by user - it can be an added functionality in the admin
// router.get('/favorites', async function(req, res, next) {
//   const {user_id} = req.body
//   try{
//     const results = await db(`SELECT * FROM favorites WHERE user_id = "${user_id}";`);
//     res.send(results.data);
//   }
//   catch(err){
//        res.status(500).send(err);
//   }
// });

module.exports = router;
