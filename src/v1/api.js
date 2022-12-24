// Content-Type':'application/json ;

import axios from "axios";

const api = axios.create({
  baseURL: "https://191.101.3.189/api/",
  headers: { "Content-Type": "application/json" },
});

export default api;
