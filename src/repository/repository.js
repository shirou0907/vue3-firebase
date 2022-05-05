import axios from "axios";

export default axios.create({
  baseURL: import.meta.VITE_APP_BASE_URL,
  headers: "Access-Control-Allow-Origin: *",
});
