import axios from "axios";

const API = axios.create({
  baseURL: "https://atm-app-ejtn.onrender.com",
});

// Attach token to every request if user is logged in
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;