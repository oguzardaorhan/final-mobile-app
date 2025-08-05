const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    proofFilePath: {
        type: String,
        required: false,
    },
    isInCourt: {
        type: Boolean,
        default: false,
    },
    isInPolice: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Case', caseSchema);
