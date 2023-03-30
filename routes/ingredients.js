var express = require('express');
var router = express.Router();
const ingredientCtrl = require('../controllers/ingredients');
// const isLoggedIn = require('../config/auth');
/* GET users listing. */

router.post('/recipes/:id/ingredients', ingredientCtrl.create);

module.exports = router;