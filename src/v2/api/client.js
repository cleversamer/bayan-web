import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.104:4000/api",
  // baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
