// routes/agreementRoutes.js

const express = require('express');
const router = express.Router();
const agreementController = require('../controllers/agreementController');

router.post('/create', agreementController.createAgreement);

module.exports = router;
