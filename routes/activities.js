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

//FILTER search
router.get('/', async function(req, res, next) {
  const {query} = req.query;
  if(query){
  try{
    const filter = await db(`SELECT * FROM activities WHERE description LIKE '%${query}%';`);
    res.send(filter.data);

  }
  catch(err){
       res.status(500).send(err);
  }}
  else{
  try{
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }}
});

// //FILTER by age 
// router.get('/:age', async function(req, res, next) {  
//    const {age} = req.params;
//   try{
//     const results = await db(`SELECT * FROM activities WHERE age LIKE '%${age}%';`);
//     res.send(results.data);
//   }
//   catch(err){
//        res.status(500).send(err);
//   }
// });

//POST new activity 
router.post('/', async function(req, res, next) {
 
  const {name, age, description} = req.body;

  try{
    await db(`INSERT INTO activities (name, age, description) VALUES ('${name}', '${age}', '${description}');`)
    const results = await db("SELECT * FROM activities ORDER BY id ASC;");
    res.status(201).send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
});

//UPDATE an acitivity - I dont have time, for  whom is gonna take this, enjoy.
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const {name, age, description} = req.body;
 
  try{
    
    await db(`UPDATE activities  SET name='${name}', age =${age}, description='${description}' WHERE id=${Number(id)}`);
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
