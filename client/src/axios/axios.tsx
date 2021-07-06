import axios from "axios";
// import { toast } from "react-toastify";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "content-type": "application/json" },
  responseType: "json",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(response);

//     return response;
//   },
//   (error) => {
//     const res = error.response;

//     switch (res.status) {
//       case 401:
//         console.log(res.data.message.message);

//         break;
//       case 500:
//         alert("Server ERROR");
//         break;

//       default:
//         break;
//     }

//     return Promise.reject(res.data.message.message);
//   }
// );

export default axiosInstance;
