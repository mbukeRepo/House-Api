const express = require('express');
const { protect,restrictedTo } = require("../controllers/authController");
const { getAllHouses,createNewHouse,getSingleHouse,updateHouse,deleteHouse } = require('../controllers/housesController');
const router = express.Router();

router.route('/').get(protect,getAllHouses).post(protect,restrictedTo("admin","commissioner"),createNewHouse);
router.route('/:id').get(protect,getSingleHouse).patch(protect,restrictedTo("admin","commissioner"),updateHouse).delete(protect,restrictedTo("admin","commissioner"),deleteHouse);

module.exports = router;