import React, { createContext, useContext, useState, useEffect } from 'react';
import {clearAuthHeader, getAuthToken, request, setAuthHeader} from '../../helpers/axios_helper';
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = getAuthToken();
            setIsAuthenticated(!!token);
        };

        checkAuthStatus();
    }, []);

    const [message, setMessage] = useState('');
    const login = async (email, password) => {
        try {
            const response = await request('post', '/log-in', { email, password });
            if (response.data.status) {
                setAuthHeader(response.data.jwt);
                setMessage('Login successful!');
                setIsAuthenticated(response.data.status)
                return response.data;
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('An error occurred during login. Please try again.');
            setIsAuthenticated(false);
        }
    };

    const logout = async () => {
        try {
            clearAuthHeader();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ isAuthenticated,login,logout }}>
            {children}
        </AuthContext.Provider>
    );
};
