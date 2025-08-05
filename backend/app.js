// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const registerRoutes = require('./routes/registerRoutes');
const caseRoutes = require('./routes/caseRoutes');
const resourcesRoutes = require('./routes/resourcesRoutes');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5001;
const verifyRoutes = require('./routes/verifyRoutes');
const agreementRoutes = require('./routes/agreementRoutes');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploads folder)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/register', registerRoutes);
app.use('/api/case-entry', caseRoutes);
app.use('/api/verify-case', verifyRoutes);
app.use('/api/agreement', agreementRoutes);
app.use('/api/case', caseRoutes);
app.use('/api/resources', resourcesRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
