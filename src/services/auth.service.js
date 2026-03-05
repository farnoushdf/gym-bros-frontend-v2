import axios from "axios";

class AuthService {
  constructor() {
    console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005"    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  signup = async (requestBody) => {
    try {
      const response = await this.api.post('/auth/signup', requestBody);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  login = async (requestBody) => {
    try {
      const response = await this.api.post('/auth/login', requestBody);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  verify = async () => {
    try {
      const response = await this.api.get('/auth/verify');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError = (error) => {
    console.error('API call error:', error);
    throw error;
  }
}

const authService = new AuthService();

export default authService;
