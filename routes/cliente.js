const express = require('express');
const router = express.Router();

const authMiddleware = require('./../src/middleware/auth');

const Cliente = require('../src/controllers/ClienteController');

router.post('/', authMiddleware, Cliente.store);

router.post('/addmedida:_id', authMiddleware, Cliente.createMedida);

router.post('/inicio', authMiddleware, Cliente.show);

router.post('/delete', authMiddleware, Cliente.destroy);

router.post('/update', authMiddleware, Cliente.update);

module.exports = router;
