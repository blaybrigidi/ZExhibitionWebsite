import User from '../models/User.js';

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User object or null
 */
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Promise<Object>} - User object or null
 */
export const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(`Error fetching user by email: ${error.message}`);
  }
};

/**
 * Create a new user
 * @param {Object} userData - User data (name, email, password)
 * @returns {Promise<Object>} - Created user object
 */
export const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated user
 */
export const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

/**
 * Delete user account
 * @param {string} userId - User ID
 * @returns {Promise<boolean>} - Success status
 */
export const deleteUser = async (userId) => {
  try {
    const result = await User.findByIdAndDelete(userId);
    return !!result;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}; 