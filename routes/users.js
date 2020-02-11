const express = require('express');
const router = express.Router();

const User = require('../src/controllers/UsuarioController');

/* GET users listing. */
router.post('/', User.store);

router.post('/auth', User.authenticate);

module.exports = router;
