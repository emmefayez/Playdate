const db = require("../model/helper");


async function emailGuard(req, res, next) {
  try {
    const { email } = req.params;

    const results = await db(`SELECT * FROM users WHERE email="${email}";`); 
    if (results.data.length) {
      return res.status(404).send({ message: "There is already an user registered with this email." }); 
    }
    next(); 
  } catch (error) {
    
    res.status(500).send(error);
  }
}

module.exports = emailGuard;