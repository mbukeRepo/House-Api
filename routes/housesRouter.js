const express = require('express');
const { getAllHouses,createNewHouse,getSingleHouse,updateHouse,deleteHouse } = require('../controllers/housesController');
const router = express.Router();

router.route('/').get(getAllHouses).post(createNewHouse);
router.route('/:id').get(getSingleHouse).patch(updateHouse).delete(deleteHouse);

module.exports = router;