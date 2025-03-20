import express from 'express';
import { getCurrentUser, updateProfile, deleteAccount } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route GET /api/users/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me', protect, getCurrentUser);

/**
 * @route PUT /api/users/me
 * @desc Update user profile
 * @access Private
 */
router.put('/me', protect, updateProfile);

/**
 * @route DELETE /api/users/me
 * @desc Delete user account
 * @access Private
 */
router.delete('/me', protect, deleteAccount);

export default router; 