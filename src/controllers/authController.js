import * as authService from '../services/authService.js';
import User from '../models/User.js'; // Added User model import
/**
 * Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.registerUser({ name, email, password });
    
    return res.status(201).send({
      status: 201,
      msg: 'User registered successfully',
      data: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        token: result.token
      }
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    
    return res.status(200).send({
      status: 200,
      msg: 'Login successful',
      data: {
        id: result.user._id,
        name: result.user.name,
        email: result.user.email,
        token: result.token
      }
    });
  } catch (error) {
    return res.status(401).send({
      status: 401,
      msg: 'Invalid credentials',
      data: null
    });
  }
};

/**
 * Get current logged in user
 * @route GET /api/auth/user
 * @access Private
 */
export const getUser = async (req, res) => {
  try {
    // req.user was set in the protect middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        status: 404,
        msg: 'User not found',
        data: null
      });
    }

    return res.status(200).send({
      status: 200,
      msg: 'User retrieved successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};