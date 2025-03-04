import axios from 'axios';
import { apiUrl } from '../constants';
import useAuthStore from '../stores/authStore';

const instance = axios.create({
    baseURL: apiUrl + '/api/auth',
    timeout: 300000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.setToken = (token) => {
    useAuthStore.getState().setToken(token);
}

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const response = error.response;
    const config = error.config
    const { status } = response;
    if (status === 401) {
        instance.post('/refresh-token')
            .then(data => {
                const accessToken = data.data.data.token;
                instance.setToken(accessToken)
                config.headers["Authorization"] = "Bearer " + accessToken;
                return instance(config)
            })
            .catch(() => {
                return Promise.reject(error);
            })
    }
    return Promise.reject(error);
})

const request = async ({url, method = 'get', headers, params, data}) => {
    const res = await instance({
        url,
        method,
        headers,
        params,
        data
    })
    return res.data.data;
}

const requestWithAuth = async ({url, method = 'get', headers, params, data, responseType}) => {
    const res = await instance({
        url,
        method,
        headers: {
            ...headers,
            Authorization: 'Bearer ' + useAuthStore.getState().token
        },
        params,
        data,
        responseType
    })
    return res.data.data;
}

export {
    request,
    requestWithAuth
}