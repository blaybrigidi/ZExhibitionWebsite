import * as userService from '../services/userService.js';

/**
 * Get current logged in user
 * @route GET /api/users/me
 * @access Private
 */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user.id);
    
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

/**
 * Update user profile
 * @route PUT /api/users/me
 * @access Private
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await userService.updateUser(req.user.id, { name, email });
    
    if (!user) {
      return res.status(404).send({
        status: 404,
        msg: 'User not found',
        data: null
      });
    }
    
    return res.status(200).send({
      status: 200,
      msg: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
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
 * Delete user account
 * @route DELETE /api/users/me
 * @access Private
 */
export const deleteAccount = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.user.id);
    
    if (!result) {
      return res.status(404).send({
        status: 404,
        msg: 'User not found',
        data: null
      });
    }
    
    return res.status(200).send({
      status: 200,
      msg: 'Account deleted successfully',
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