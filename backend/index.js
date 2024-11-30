const dotenv = require('dotenv');
dotenv.config();
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // MongoDB ODM
const cors = require('cors'); // For Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // For parsing request bodies

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const userRoutes = require('./routes/userRoutes'); // User routes
const employeeRoutes = require('./routes/employeeRoutes'); //Employee Routes
app.use('/api/users', userRoutes); // Mount the user routes
app.use('/api/employees', employeeRoutes); //Employee routes

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});
