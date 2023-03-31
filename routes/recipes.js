var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes');
const isLoggedIn = require('../config/auth');
/* GET users listing. */

router.get('/', recipesCtrl.index);
router.get('/new', recipesCtrl.new);
router.get('/:id', recipesCtrl.show);
// router.get('/:id/edit', recipesCtrl.edit);
router.post('/', recipesCtrl.create);
// router.put('/:id', recipesCtrl.update);

module.exports = router;