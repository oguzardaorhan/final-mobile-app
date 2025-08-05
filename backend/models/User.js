const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    caseDescription: {
        type: String,
        required: true,
    },
    photoPath: {
        type: String,
        required: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
