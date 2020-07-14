const express = require('express');
const router = express.Router();

const {requireSignin} = require('../controllers/user')
const {create, read, remove} = require('../controllers/message')

router.post("/message/create", create)
router.get('/message/read', requireSignin, read)
router.delete("/message/delete/:deleteId", requireSignin, remove)


module.exports = router;
