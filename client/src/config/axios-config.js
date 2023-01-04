import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://instagram-clone-react-node-app.onrender.com",
});

export default axiosInstance;
