import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

// Load env vars
dotenv.config();

// ES modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to database (with fallback to continue running the app)
try {
  await connectDB();
} catch (error) {
  console.error(`MongoDB connection error: ${error.message}`);
  console.log('App running without database connection');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static file handling - order matters!
// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve images specifically from public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve the views directory for direct HTML access
app.use(express.static(path.join(__dirname, '/')));

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import exhibitionRoutes from './src/routes/exhibitionRoutes.js';

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exhibitions', exhibitionRoutes);

// Routes for HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/signup.html'));
});

app.get('/exhibitions', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/exhibitions.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

// API routes
app.get('/api/artworks', (req, res) => {
  // This will be replaced with actual database queries later
  res.status(200).send({
    status: 200,
    msg: 'Artworks will be loaded here',
    data: null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 