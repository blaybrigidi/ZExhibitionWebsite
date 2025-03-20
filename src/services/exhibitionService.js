import Exhibition from '../models/Exhibition.js';
import Ticket from '../models/Ticket.js';

/**
 * Get all exhibitions
 * @returns {Promise<Array>} - Array of exhibitions
 */
export const getAllExhibitions = async () => {
  try {
    return await Exhibition.find();
  } catch (error) {
    throw new Error(`Error fetching exhibitions: ${error.message}`);
  }
};

/**
 * Get exhibition by ID
 * @param {string} id - Exhibition ID
 * @returns {Promise<Object>} - Exhibition object
 */
export const getExhibitionById = async (id) => {
  try {
    const exhibition = await Exhibition.findById(id);
    
    if (!exhibition) {
      throw new Error('Exhibition not found');
    }
    
    return exhibition;
  } catch (error) {
    throw new Error(`Error fetching exhibition: ${error.message}`);
  }
};

/**
 * Create new exhibition
 * @param {Object} exhibitionData - Exhibition data
 * @returns {Promise<Object>} - Created exhibition
 */
export const createExhibition = async (exhibitionData) => {
  try {
    return await Exhibition.create(exhibitionData);
  } catch (error) {
    throw new Error(`Error creating exhibition: ${error.message}`);
  }
};

/**
 * Update exhibition
 * @param {string} id - Exhibition ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated exhibition
 */
export const updateExhibition = async (id, updateData) => {
  try {
    const exhibition = await Exhibition.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!exhibition) {
      throw new Error('Exhibition not found');
    }
    
    return exhibition;
  } catch (error) {
    throw new Error(`Error updating exhibition: ${error.message}`);
  }
};

/**
 * Delete exhibition
 * @param {string} id - Exhibition ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteExhibition = async (id) => {
  try {
    const result = await Exhibition.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    throw new Error(`Error deleting exhibition: ${error.message}`);
  }
};

/**
 * Purchase a ticket
 * @param {string} exhibitionId - Exhibition ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Ticket object
 */
export const purchaseTicket = async (exhibitionId, userId) => {
  try {
    // Get exhibition
    const exhibition = await getExhibitionById(exhibitionId);
    
    // Check availability
    if (exhibition.ticketsSold >= exhibition.capacity) {
      throw new Error('Exhibition is sold out');
    }
    
    // Check if user already has a ticket
    const existingTicket = await Ticket.findOne({
      exhibitionId,
      userId,
      status: 'active'
    });
    
    let ticket;
    
    if (existingTicket) {
      // Update existing ticket
      existingTicket.quantity += 1;
      ticket = await existingTicket.save();
    } else {
      // Create new ticket
      ticket = await Ticket.create({
        exhibitionId,
        userId
      });
    }
    
    // Update exhibition
    exhibition.ticketsSold += 1;
    await exhibition.save();
    
    return ticket;
  } catch (error) {
    throw new Error(`Error purchasing ticket: ${error.message}`);
  }
};

/**
 * Refund a ticket
 * @param {string} exhibitionId - Exhibition ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Updated ticket
 */
export const refundTicket = async (exhibitionId, userId) => {
  try {
    // Get exhibition
    const exhibition = await getExhibitionById(exhibitionId);
    
    // Find ticket
    const ticket = await Ticket.findOne({
      exhibitionId,
      userId,
      status: 'active'
    });
    
    if (!ticket) {
      throw new Error('No active ticket found');
    }
    
    // Update ticket
    if (ticket.quantity > 1) {
      ticket.quantity -= 1;
      await ticket.save();
    } else {
      ticket.status = 'refunded';
      await ticket.save();
    }
    
    // Update exhibition
    exhibition.ticketsSold -= 1;
    await exhibition.save();
    
    return ticket;
  } catch (error) {
    throw new Error(`Error refunding ticket: ${error.message}`);
  }
};

/**
 * Get user tickets
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of tickets
 */
export const getUserTickets = async (userId) => {
  try {
    return await Ticket.find({
      userId,
      status: 'active'
    }).populate('exhibitionId');
  } catch (error) {
    throw new Error(`Error fetching user tickets: ${error.message}`);
  }
}; 