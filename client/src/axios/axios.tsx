import axios from "axios";
// import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "content-type": "application/json" },
  responseType: "json",
  withCredentials: true,
});

axiosInstance.interceptors.response.use((response) => {
  console.log(response);

  return response;
}, undefined);

export default axiosInstance;
