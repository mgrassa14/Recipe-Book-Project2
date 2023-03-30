var express = require('express');
var router = express.Router();
const ingredientCtrl = require('../controllers/ingredients');
// const isLoggedIn = require('../config/auth');
/* GET users listing. */

router.post('/recipes/:id/ingredients', ingredientCtrl.create);
router.delete('/ingredients/:id', ingredientCtrl.delete);

module.exports = router;