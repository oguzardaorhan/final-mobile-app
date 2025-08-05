// routes/registerRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleRegistration } = require('../controllers/registerController');

// Dosyaların yükleneceği klasörü ve isim formatını ayarla
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Fotoğraflar buraya gelecek
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `user-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage });

// POST /api/register
router.post('/', upload.single('photo'), handleRegistration);

module.exports = router;
