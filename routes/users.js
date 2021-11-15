var express = require('express');
// const emailGuard = require('../guards/emailGuard');
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
});

//GET a specific user - I am using this method to show an user in the User component (Myprofile page)
//probably you will not need this once auth is incorporeted into the project
router.get('/:id', userIdGuard, async function(req, res, next){
  try{
    const {id} = req.params
    const results = await db(`SELECT * FROM users WHERE id="${id}";`);
    res.send(results.data);
  }
  catch(err){
    console.log('am i here now?', err)
       res.status(500).send(err);
  }
});


//CREATE USER
router.post('/', async function(req, res, next) {
  const { avatar, name, email, password, repeat_password } = req.body;
 
  const query = `INSERT INTO users (avatar, name, email, password, repeat_password) VALUES ('${avatar}','${name}', '${email}', '${password}', '${repeat_password}');`

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
  const {name, email, password, repeat_password } = req.body;
 
  try{
    
    await db(`UPDATE users SET name='${name}' email='${email}' password='${password}' repeat_password='${repeat_password}' avatar='${avatar}' WHERE id=${Number(id)}`);
    res.status(200).send({message: "Profile updated"});
  }
  catch(err){
    console.log(err)
       res.status(500).send(err);
  }
});

module.exports = router;