var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */ //it works
router.get('/', async function(req, res, next) {
  try{
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//POST new activity - it works in local host, I see error in postman
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

//UPDATE an acitivity //not working
// router.put('/:id', async function(req, res, next) {
//   const { id } = req.params;
//   const {age_range, indoor, outdoor, description} = req.body;

//   try{
//     await db(`UPDATE activities  SET age_range = '${age_range}', indoor='${indoor}', outdoor='${outdoor}', description='${description}' WHERE id="${id}";`)
//     const results = await db(`SELECT FROM activities WHERE id = "${id}";`);
//     res.status(204).send(results.data);
//   }
//   catch(err){
//        res.status(500).send(err);
//   }
// });

//DELETE an activity by ID -it works in local but I see error in postman

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
