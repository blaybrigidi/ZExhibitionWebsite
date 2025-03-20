import * as exhibitionService from '../services/exhibitionService.js';

/**
 * Get all exhibitions
 * @route GET /api/exhibitions
 * @access Public
 */
export const getExhibitions = async (req, res) => {
  try {
    const exhibitions = await exhibitionService.getAllExhibitions();
    
    return res.status(200).send({
      status: 200,
      msg: 'Exhibitions retrieved successfully',
      data: exhibitions
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Get single exhibition
 * @route GET /api/exhibitions/:id
 * @access Public
 */
export const getExhibition = async (req, res) => {
  try {
    const exhibition = await exhibitionService.getExhibitionById(req.params.id);
    
    return res.status(200).send({
      status: 200,
      msg: 'Exhibition retrieved successfully',
      data: exhibition
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).send({
        status: 404,
        msg: 'Exhibition not found',
        data: null
      });
    }
    
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Create new exhibition
 * @route POST /api/exhibitions
 * @access Private (Admin)
 */
export const createExhibition = async (req, res) => {
  try {
    const exhibition = await exhibitionService.createExhibition(req.body);
    
    return res.status(201).send({
      status: 201,
      msg: 'Exhibition created successfully',
      data: exhibition
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
 * Update exhibition
 * @route PUT /api/exhibitions/:id
 * @access Private (Admin)
 */
export const updateExhibition = async (req, res) => {
  try {
    const exhibition = await exhibitionService.updateExhibition(req.params.id, req.body);
    
    return res.status(200).send({
      status: 200,
      msg: 'Exhibition updated successfully',
      data: exhibition
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).send({
        status: 404,
        msg: 'Exhibition not found',
        data: null
      });
    }
    
    return res.status(400).send({
      status: 400,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Delete exhibition
 * @route DELETE /api/exhibitions/:id
 * @access Private (Admin)
 */
export const deleteExhibition = async (req, res) => {
  try {
    const result = await exhibitionService.deleteExhibition(req.params.id);
    
    if (!result) {
      return res.status(404).send({
        status: 404,
        msg: 'Exhibition not found',
        data: null
      });
    }
    
    return res.status(200).send({
      status: 200,
      msg: 'Exhibition deleted successfully',
      data: null
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Purchase a ticket
 * @route POST /api/exhibitions/:id/purchase
 * @access Private
 */
export const purchaseTicket = async (req, res) => {
  try {
    const ticket = await exhibitionService.purchaseTicket(req.params.id, req.user.id);
    
    return res.status(201).send({
      status: 201,
      msg: 'Ticket purchased successfully',
      data: ticket
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).send({
        status: 404,
        msg: 'Exhibition not found',
        data: null
      });
    }
    
    if (error.message.includes('sold out')) {
      return res.status(400).send({
        status: 400,
        msg: 'Exhibition is sold out',
        data: null
      });
    }
    
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Refund a ticket
 * @route POST /api/exhibitions/:id/refund
 * @access Private
 */
export const refundTicket = async (req, res) => {
  try {
    const ticket = await exhibitionService.refundTicket(req.params.id, req.user.id);
    
    return res.status(200).send({
      status: 200,
      msg: 'Ticket refunded, but no money will be returned according to our policy',
      data: ticket
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).send({
        status: 404,
        msg: error.message,
        data: null
      });
    }
    
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
};

/**
 * Get user tickets
 * @route GET /api/exhibitions/user/tickets
 * @access Private
 */
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await exhibitionService.getUserTickets(req.user.id);
    
    return res.status(200).send({
      status: 200,
      msg: 'User tickets retrieved successfully',
      data: tickets
    });
  } catch (error) {
    return res.status(500).send({
      status: 500,
      msg: error.message,
      data: null
    });
  }
}; 