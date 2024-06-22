import axios from 'axios';

// Create an Axios instance with a base configuration
const api = axios.create({
    baseURL: 'https://cmsapp-7rcvdwc4nq-uc.a.run.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// // Optional: Add a request interceptor to include tokens or other headers
api.interceptors.request.use(
    (config) => {
        // Example: Include an authorization token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors (e.g., redirect to login on 401)
        if (error.response && error.response.status === 401) {
            // Example: Redirect to login page
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;
