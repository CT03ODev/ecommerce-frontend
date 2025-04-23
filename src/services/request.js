import axios from 'axios';
import { apiUrl } from '../constants';
import useAuthStore from '../stores/authStore';

const instance = axios.create({
    baseURL: apiUrl + '/api',
    timeout: 300000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.setToken = (token) => {
    useAuthStore.getState().setToken(token);
};

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const response = error.response;
        const config = error.config;

        // Ensure response and config exist
        if (!response || !config) {
            return Promise.reject(error);
        }

        const { status } = response;

        // Handle 401 errors and prevent infinite loops
        if (status === 401 && !config._retry && config.url !== '/auth/refresh' && config.url!== '/auth/logout') {
            config._retry = true; // Mark the request as retried
            try {
                const data = await instance.post('/auth/refresh');
                const accessToken = data.data.data.token;

                // Update token in the store and headers
                instance.setToken(accessToken);
                config.headers["Authorization"] = "Bearer " + accessToken;

                // Retry the original request with the new token
                return instance(config);
            } catch (refreshError) {
                // If token refresh fails with 401, log out the user
                if (refreshError.response?.status === 401) {
                    useAuthStore.getState().logout(); // Clear token and user data
                }
                // Reject with the original error
                return Promise.reject(error);
            }
        }

        // If the error is not a 401 or refresh fails, reject with the original error
        return Promise.reject(error);
    }
);

const request = async ({ url, method = 'get', headers, params, data }) => {
    const res = await instance({
        url,
        method,
        headers,
        params,
        data,
    });
    return res.data;
};

const requestWithAuth = async ({ url, method = 'get', headers, params, data, responseType }) => {
    const res = await instance({
        url,
        method,
        headers: {
            ...headers,
            Authorization: 'Bearer ' + useAuthStore.getState().token,
        },
        params,
        data,
        responseType,
    });
    return res.data;
};

export {
    request,
    requestWithAuth,
};