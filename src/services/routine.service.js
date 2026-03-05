import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const routineService = {
  createRoutine: async (routineData, userId) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${API_URL}/routines/create-routine`,
        { ...routineData, userId }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      throw error;
    }
  },

  fetchOneRoutine: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/one-routine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteOneRoutine: async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_URL}/routines/delete-routine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchUserRoutines: async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/user-routine/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  fetchAllRoutines: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/routines/all-routines`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateRoutine: async (id, routineData) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        `${API_URL}/routines/update-routine/${id}`,
        routineData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default routineService;
