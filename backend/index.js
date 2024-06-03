// backend/index.js
const express = require('express');
const connectDB = require('./config/db'); // Ensure this path is correct
const doctorRoutes = require('./routes/doctorRoute'); // Ensure this path is correct
const admissionRoutes = require('./routes/admissionRoute'); // Ensure this path is correct

const app = express();

console.log('Connecting to MongoDB...');
// Connect to MongoDB
connectDB();

console.log('Setting up middleware...');
// Middleware to parse JSON
app.use(express.json());

console.log('Setting up routes...');
// Use routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/admissions', admissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
