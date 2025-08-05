// routes/resourcesRoutes.js
const express = require('express');
const router = express.Router();
const { getResources } = require('../controllers/resourcesController');

router.get('/', getResources);

module.exports = router;
