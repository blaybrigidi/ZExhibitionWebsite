import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Exhibition from './models/Exhibition.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Sample exhibition data
const exhibitions = [
  {
    title: "African Heritage Showcase",
    description: "A powerful exploration of African cultural heritage through contemporary art, featuring works from emerging and established artists across the continent.",
    image: "/images/A.png",
    dateRange: "March 15 - April 10, 2025",
    price: 25,
    capacity: 50,
    ticketsSold: 0
  },
  {
    title: "Modern Storytelling",
    description: "An immersive exhibition exploring how contemporary artists use various mediums to tell powerful stories that bridge past traditions with modern perspectives.",
    image: "/images/B.png",
    dateRange: "April 20 - May 15, 2025",
    price: 22,
    capacity: 75,
    ticketsSold: 0
  },
  {
    title: "Cultural Connections",
    description: "Discover how different cultures influenced each other throughout history, expressed through a curated collection of artifacts, paintings, and interactive installations.",
    image: "/images/C.png",
    dateRange: "June 5 - July 12, 2025",
    price: 28,
    capacity: 60,
    ticketsSold: 0
  },
  {
    title: "Rhythms & Rituals",
    description: "An exploration of how music, dance, and ceremonial practices have shaped communities and cultural identities across generations.",
    image: "/images/img1.jpg",
    dateRange: "August 10 - September 20, 2025",
    price: 30,
    capacity: 100,
    ticketsSold: 0
  },
  {
    title: "Women in Art",
    description: "Celebrating the contributions of women artists who have broken barriers and reshaped our understanding of art, identity, and cultural expression.",
    image: "/images/zahra.jpg",
    dateRange: "October 1 - November 15, 2025",
    price: 25,
    capacity: 80,
    ticketsSold: 0
  },
  {
    title: "Future Traditions",
    description: "A forward-looking exhibition examining how traditional cultural practices are being reimagined and preserved through technology and innovative artistic approaches.",
    image: "/images/woman2.jpg",
    dateRange: "December 5, 2025 - January 20, 2026",
    price: 27,
    capacity: 70,
    ticketsSold: 0
  }
];

// Connect to MongoDB
const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Delete existing exhibitions
    await Exhibition.deleteMany({});
    console.log('Deleted existing exhibitions');
    
    // Insert new exhibitions
    await Exhibition.insertMany(exhibitions);
    console.log('Added exhibition seed data');
    
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase(); 