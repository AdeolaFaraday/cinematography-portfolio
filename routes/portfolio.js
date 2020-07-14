const express = require('express');
const router = express.Router();

const {requireSignin} = require('../controllers/user')
const {create, list, photo, remove, portfolioById} = require('../controllers/portfolio')


router.post("/portfolio/create", requireSignin, create)
router.get("/portfolio/list", list);
router.get("/portfolio/photo/:portfolioId", photo);
router.delete("/portfolio/remove/:portfolioId", requireSignin, remove);

router.param("portfolioId", portfolioById)

// 5f02fd017e86ca227020552f
module.exports = router;
