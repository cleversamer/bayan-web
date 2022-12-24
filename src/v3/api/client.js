import axios from "axios";

const api = axios.create({
  // baseURL: "http://191.101.3.193/api",
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
