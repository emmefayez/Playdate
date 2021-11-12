var express = require('express');
var router = express.Router();
const userIdGuard = require("../guards/userIdGuard");
const db = require("../model/helper");


//Get list of users 
router.get('/', async function(req, res, next){
  try{
    const results = await db("SELECT * FROM users ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
})

//CREATE USER
router.post('/', async function(req, res, next) {
  const { name } = req.body;
 
  const query = `INSERT INTO users (name) VALUES ('${name}');`

  try{
    const user = await db(query)
    res.status(201).send({message: "User created!"});
    
  }
  catch(err){
       res.status(500).send(err);
  }
});

//DELETE PROFILE
router.delete('/:id', userIdGuard,  async function(req, res, next) {
  
  //const { id } = req.params;
  
  try{
    await db(`DELETE * FROM users WHERE id = "${id}";`)
    res.send({message:"Profile deleted"});
  }
  catch(err){
       res.status(500).send(err);
  }
});

//UPDATE USER PROFILE
router.put('/:id', userIdGuard, async function(req, res, next) {
  //const { id } = req.params;
  const {name } = req.body;
 
  try{
    
    await db(`UPDATE users SET name='${name}' WHERE id=${Number(id)}`);
    res.status(200).send({message: "Profile updated"});
  }
  catch(err){
    console.log(err)
       res.status(500).send(err);
  }
});

module.exports = router;