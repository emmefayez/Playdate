var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//POST new activity
router.post('/', async function(req, res, next) {
 
  const {name, age_range, indoor, outdoor, description} = req.body;

  try{
    await db(`INSERT INTO activities (name, age_range, indoor, outdoor, description) VALUES (${name}, ${age_range}, ${indoor}, ${outdoor}, ${description})`)
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});


//DELETE an activity by ID

router.delete('/:id', async function(req, res, next) {
  
  const { id } = req.params;
  
  try{
    await db(`DELETE FROM activities WHERE id = "${id}";`)
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});




module.exports = router;
