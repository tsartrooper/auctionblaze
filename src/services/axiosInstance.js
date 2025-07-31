import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("token: "+token);

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default axiosInstance;