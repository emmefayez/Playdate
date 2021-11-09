var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET activities listing. */
router.get('/', async function(req, res, next) {
  try{
    const results = await db("SELECT * FROM activities ORDER BY name;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//Filter activities
router.get('/', async function(req, res, next) {
  const query = req.query;
  const params = req.params
  try{
    const results = await db(`SELECT * FROM activities WHERE ${query} = "${params}";`);
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});


//ADD activity to favorities
router.post('/activities/:id', async function(req, res, next) {
 
  const {activity_id, user_id} = req.body;

  try{
    await db(`INSERT INTO favorities_activities (activity_id) VALUES (${activity_id})`)
     await db(`INSERT INTO favorities_activities (user_id) VALUES (${user_id})`)
    res.send({message: "activity added to favorities"});
  }
  catch(err){
       res.status(500).send(err);
  }
});

//GET list of fav activities 
router.get('/favorites_activities', async function(req, res, next) {
  const {user_id} = req.body
  try{
    const results = await db(`SELECT * FROM favorites_activities WHERE user_id = "${user_id}";`);
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});


module.exports = router;
