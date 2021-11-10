var express = require('express');
var router = express.Router();
const db = require("../model/helper");


//Get list of users 
router.get('/users', async function(req, res, next){
  try{
    const results = await db("SELECT * FROM users ORDER BY id ASC;");
    res.send(results.data);
  }
  catch(err){
       res.status(500).send(err);
  }
})

//CREATE USER
router.post('/users', async function(req, res, next) {
 
  const {name} = req.body;

  try{
    await db(`INSERT INTO users (name) VALUES ('${name}');`)
    res.status(201).send({message: "user created!"});
  }
  catch(err){
       res.status(500).send(err);
  }
});