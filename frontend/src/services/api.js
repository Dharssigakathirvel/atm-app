import axios from "axios";

const API = axios.create({
  baseURL:" https://atm-app-ejtn.onrender.com",
});

export default API;