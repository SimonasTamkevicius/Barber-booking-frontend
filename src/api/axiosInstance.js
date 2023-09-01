import axios from "axios";

const backendBaseURL = "http://localhost:9000";

const axiosInstance = axios.create({
    baseURL: backendBaseURL,
});

export default axiosInstance;
