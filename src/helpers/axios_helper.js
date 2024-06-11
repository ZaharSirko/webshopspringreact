import axios from 'axios';

const TOKEN_EXPIRY_TIME = 60*60*1000;

export const getAuthToken = () => {
    const token = window.localStorage.getItem('auth_token');
    const tokenExpiry = window.localStorage.getItem('auth_token_expiry');

    if (token && tokenExpiry) {
        const now = new Date().getTime();
        if (now >= tokenExpiry) {
            clearAuthHeader();
            return null;
        }
        return token;
    }
    return null;
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        const now = new Date().getTime();
        const expiryTime = now + TOKEN_EXPIRY_TIME;
        window.localStorage.setItem("auth_token", token);
        window.localStorage.setItem("auth_token_expiry", expiryTime);
    } else {
        clearAuthHeader();
    }
};

export const clearAuthHeader = () => {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("auth_token_expiry");
};

axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method, url, data) => {
    let headers = {};
    const token = getAuthToken();
    if (token) {
        headers = {'Authorization': `Bearer ${token}`};
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
};

setInterval(() => {
    getAuthToken();
}, 60*60*1000);
