const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database (with fallback to continue running the app)
console.log('Attempting to connect to MongoDB...');
try {
  connectDB().then(connected => {
    if (!connected) {
      console.log('Running app without database connection. Authentication features will not work.');
    }
  });
} catch (error) {
  console.error(`MongoDB connection error: ${error.message}`);
  console.log('App running without database connection. Authentication features will not work.');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Route files
const authRoutes = require('./routes/authRoutes');

// Mount API routers
app.use('/api/auth', authRoutes);

// Routes for HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

app.get('/exhibitions', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/exhibitions.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// API routes
app.get('/api/artworks', (req, res) => {
  // This will be replaced with actual database queries later
  res.json({ message: 'Artworks will be loaded here' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 