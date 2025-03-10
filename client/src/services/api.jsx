import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true; // Include cookies in requests

// ✅ Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// ✅ Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// ✅ Get User Profile
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

// ✅ Logout User
export const logoutUser = async () => {
  await axios.post(`${API_URL}/logout`);
  Cookies.remove("jwt");
};
