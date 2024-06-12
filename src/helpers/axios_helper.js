import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const getAuthToken = () => {
    const token = window.localStorage.getItem('auth_token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decodedToken.exp < now) {
                clearAuthHeader();
                return null;
            }
            return token;
        } catch (e) {
            clearAuthHeader();
            return null;
        }
    }
    return null;
};

export const hasRoleAdmin = () => {
    const token = getAuthToken();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.authorities && decodedToken.authorities.includes('ROLE_ADMIN');
    }
    return false;
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
    } else {
        clearAuthHeader();
    }
};

export const clearAuthHeader = () => {
    window.localStorage.removeItem("auth_token");
};

axios.defaults.baseURL = 'http://localhost:8080';

export const request = (method, url, data) => {
    let headers = {};
    const token = getAuthToken();
    if (token) {
        headers = { 'Authorization': `Bearer ${token}` };
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
}, 60 * 60  * 1000);
