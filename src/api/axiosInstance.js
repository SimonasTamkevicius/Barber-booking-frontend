import axios from "axios";

// const backendBaseURL = "http://localhost:9000";
const backendBaseURL = "https://relieved-skirt-duck.cyclic.app";

const axiosInstance = axios.create({
    baseURL: backendBaseURL,
});

export default axiosInstance;
