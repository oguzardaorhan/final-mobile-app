const path = require('path');
const User = require('../models/User'); // Model dosyasını dahil ettik

exports.handleRegistration = async (req, res) => {
    try {
        const { name, contact, address, caseDescription } = req.body;
        const photo = req.file;

        if (!name || !contact || !address || !caseDescription) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        let photoUrl = null;
        if (photo) {
            photoUrl = `/uploads/${photo.filename}`;
        }

        // Veriyi MongoDB'ye kaydet
        const newUser = new User({
            name,
            contact,
            address,
            caseDescription,
            photoPath: photoUrl,
        });

        await newUser.save();

        return res.status(201).json({
            message: 'Registration successful.',
            userId: newUser._id,
        });

    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};
