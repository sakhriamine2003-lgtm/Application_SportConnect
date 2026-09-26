import axios from "axios";

const apiHost = window.location.hostname || "localhost";

const api = axios.create({
  baseURL: `http://${apiHost}:8000/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export default api;
