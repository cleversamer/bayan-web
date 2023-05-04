import axios from "axios";

const api = axios.create({
  // baseURL: "http://191.101.229.249/api",
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://monkeyroadcar.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
