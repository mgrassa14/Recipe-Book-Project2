var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const isLoggedIn = require('../config/auth');
/* GET users listing. */

router.get('/', recipesCtrl.index);
// router.get('/new', recipesCtrl.new);
// router.get('/:id', recipesCtrl.show);
router.post('/', isLoggedIn, recipesCtrl.create);

module.exports = router;