import jwt from 'jsonwebtoken';
import * as userService from '../services/userService.js';

/**
 * Middleware to protect routes
 * Verifies JWT token and adds user to request
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if auth header exists and has token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).send({
      status: 401,
      msg: 'Not authorized to access this route',
      data: null
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');

    // Get user from the token
    req.user = await userService.getUserById(decoded.id);

    if (!req.user) {
      return res.status(401).send({
        status: 401,
        msg: 'User not found',
        data: null
      });
    }

    next();
  } catch (error) {
    return res.status(401).send({
      status: 401,
      msg: 'Not authorized to access this route',
      data: null
    });
  }
};

/**
 * Middleware to restrict routes to admin users
 * Must be used after protect middleware
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(403).send({
      status: 403,
      msg: 'Not authorized as an admin',
      data: null
    });
  }
}; 