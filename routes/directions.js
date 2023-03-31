var express = require('express');
var router = express.Router();
const directionCtrl = require('../controllers/directions');
// const isLoggedIn = require('../config/auth');
/* GET users listing. */

router.post('/recipes/:id/directions', directionCtrl.create);
router.delete('/directions/:id', directionCtrl.delete);

module.exports = router;