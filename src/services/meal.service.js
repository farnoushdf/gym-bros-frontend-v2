import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const mealService = {
  createMeal: async (mealData, userId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/meals/create-meal`,
        { ...mealData, userId }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchOneMeal: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/one-meal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteOneMeal: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_URL}/meals/delete-meal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchUserMeals: async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/your-meal/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchAllMeals: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/meals/all-meals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  updateMeal: async (id, mealData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${API_URL}/meals/update-meal/${id}`,
        mealData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default mealService;
