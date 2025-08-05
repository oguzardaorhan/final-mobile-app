// routes/verifyRoutes.js

const express = require('express');
const router = express.Router();
const { verifyCase } = require('../controllers/verifyController');

router.post('/', verifyCase);

module.exports = router;
