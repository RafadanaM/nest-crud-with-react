import axios, { AxiosInstance } from "axios";
// import { toast } from "react-toastify";
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.30:5000/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  (error) => {
    const res = error.response;

    if (!res?.status) {
      alert(error);
      return Promise.reject(error);
    }

    switch (res.status) {
      case 401:
        console.log(res.data.message.message);

        break;
      case 500:
        alert("Server ERROR");
        break;

      default:
        break;
    }

    return Promise.reject(res);
  }
);

export default axiosInstance;
