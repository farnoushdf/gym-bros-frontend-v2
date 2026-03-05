import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; 

const userService = {
  getUser: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.patch(
        `${API_URL}/api/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
};

export default userService;
