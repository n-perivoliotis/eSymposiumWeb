const express = require('express');
const router = express.Router();
const users_controller = require('../controllers/displaySymposiumUser');


router.get('/home', users_controller.allUsers);

router.get('/users/:username', users_controller.displayUser);

module.exports = router;