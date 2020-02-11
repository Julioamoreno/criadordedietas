const express = require('express');
const router = express.Router();

const Cliente = require('../src/controllers/ClienteController');

router.post('/', Cliente.showAll);

module.exports = router;