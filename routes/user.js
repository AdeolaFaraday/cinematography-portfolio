const express = require('express');
const router = express.Router();

const {signup, signin, signout, requireSignin} = require('../controllers/user')

router.post("/signup", signup)

router.post("/signin", signin)

router.get("/home", requireSignin, (req, res) => {
  res.json({
    message: "hello from routes"
  })
})

router.get("/signout", signout)


module.exports = router;
