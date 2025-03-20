import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userService from './userService.js';

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @returns {string} - JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, 
    process.env.JWT_SECRET || 'secretkey', 
    { expiresIn: '30d' }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object} - Decoded token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Object} - User and token
 */
export const registerUser = async (userData) => {
  // Check if user exists
  const existingUser = await userService.getUserByEmail(userData.email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create user
  const user = await userService.createUser(userData);
  
  // Generate token
  const token = generateToken(user._id);
  
  return { user, token };
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} - User and token
 */
export const loginUser = async (email, password) => {
  // Check for user
  const user = await userService.getUserByEmail(email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Generate token
  const token = generateToken(user._id);
  
  return { user, token };
}; 