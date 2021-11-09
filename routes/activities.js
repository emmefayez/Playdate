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

//FILTER

//POST new activity 
router.post('/', async function(req, res, next) {
 
  const {name, age_range, indoor, outdoor, description} = req.body;

  try{
    await db(`INSERT INTO activities (name, age_range, indoor, outdoor, description) VALUES ('${name}', '${age_range}', '${indoor}', '${outdoor}', '${description}');`)
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.status(201).send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//UPDATE an acitivity 
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const {name, age_range, indoor, outdoor, description} = req.body;
 
  try{
    //const res = await db(`UPDATE activities  SET name = 'activity1', age_range = 5 , indoor= 0, outdoor= 1, description='exampl22e' WHERE id=4`);
    await db(`UPDATE activities  SET name='${name}', age_range =${age_range} , indoor=${indoor}, outdoor=${outdoor}, description='${description}' WHERE id=${Number(id)}`);
    res.status(200).send({message: "activity updated"});
  }
  catch(err){
    console.log(err)
       res.status(500).send(err);
  }
});

//DELETE an activity by ID 

router.delete('/:id', async function(req, res, next) {
  
  const { id } = req.params;
  
  try{
    await db(`DELETE FROM activities WHERE id = "${id}";`)
    res.send({message:"activity deleted"});
  }
  catch(err){
       res.status(500).send(err);
  }
});




module.exports = router;
