// routes/caseRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleCaseEntry } = require('../controllers/caseController');

// Yükleme klasörü ve isimlendirme
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `proof-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage });

// POST /api/case-entry
router.post('/', upload.single('proofFile'), handleCaseEntry);

module.exports = router;
