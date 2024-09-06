const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');
const roleMiddleware = require('./src/middleware/roleMiddleware');
const db = require('./src/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/admin', authMiddleware, roleMiddleware('Admin'), adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
