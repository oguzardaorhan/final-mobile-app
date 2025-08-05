const path = require('path');
const Case = require('../models/Case');

exports.handleCaseEntry = async (req, res) => {
    try {
        const { isInCourt, isInPolice } = req.body;
        const proofFile = req.file;

        if (!proofFile) {
            return res.status(400).json({ message: 'Proof file is required.' });
        }

        const fileUrl = `/uploads/${proofFile.filename}`;

        const newCase = new Case({
            proofFilePath: fileUrl,
            isInCourt: isInCourt === 'true',
            isInPolice: isInPolice === 'true',
        });

        await newCase.save();

        return res.status(201).json({
            message: 'Case entry submitted successfully.',
            caseId: newCase._id,
        });

    } catch (error) {
        console.error('Case entry error:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};
