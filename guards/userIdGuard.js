const db = require("../model/helper");


async function userIdGuard(req, res, next) {
  try {
    const id = req.params.id;
   console.log("this is from the guard", id)
    const results = await db(`SELECT * FROM users WHERE id="${id}";`); 
    if (results.data.length === 0) {
      
      return res.status(404).send({ message: "There is no user with this id" }); 
    }
    console.log("I make it here");
    next(); 
  } catch (error) {
    
    res.status(500).send(error);
  }
}

module.exports = userIdGuard;