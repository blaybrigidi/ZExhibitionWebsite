import express from 'express';
import { 
  getExhibitions, 
  getExhibition, 
  createExhibition,
  updateExhibition,
  deleteExhibition,
  purchaseTicket,
  refundTicket,
  getUserTickets
} from '../controllers/exhibitionController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
/**
 * @route GET /api/exhibitions
 * @desc Get all exhibitions
 * @access Public
 */
router.get('/', getExhibitions);

/**
 * @route GET /api/exhibitions/:id
 * @desc Get single exhibition
 * @access Public
 */
router.get('/:id', getExhibition);

// Protected admin routes
/**
 * @route POST /api/exhibitions
 * @desc Create new exhibition
 * @access Private (Admin)
 */
router.post('/', protect, admin, createExhibition);

/**
 * @route PUT /api/exhibitions/:id
 * @desc Update exhibition
 * @access Private (Admin)
 */
router.put('/:id', protect, admin, updateExhibition);

/**
 * @route DELETE /api/exhibitions/:id
 * @desc Delete exhibition
 * @access Private (Admin)
 */
router.delete('/:id', protect, admin, deleteExhibition);

// Protected user routes
/**
 * @route POST /api/exhibitions/:id/purchase
 * @desc Purchase a ticket
 * @access Private
 */
router.post('/:id/purchase', protect, purchaseTicket);

/**
 * @route POST /api/exhibitions/:id/refund
 * @desc Refund a ticket
 * @access Private
 */
router.post('/:id/refund', protect, refundTicket);

/**
 * @route GET /api/exhibitions/user/tickets
 * @desc Get user tickets
 * @access Private
 */
router.get('/user/tickets', protect, getUserTickets);

export default router; 