const express = require('express');
const router = express.Router();
const authMiddleware = require('../src/middleware/auth');

const Dieta = require('../src/controllers/DietaController');

router.post('/add', authMiddleware, Dieta.store);

router.post('/', authMiddleware, Dieta.showAll);

router.post('/update', authMiddleware, Dieta.update);

router.post('/delete', authMiddleware, Dieta.destroy);

module.exports = router;
