import React, { createContext, useContext, useState, useEffect } from 'react';
import {clearAuthHeader, request, setAuthHeader} from '../../helpers/axios_helper';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await request('get', '/profile/status');
                setIsAuthenticated(response.data);
            } catch (error) {
                console.error('Error checking auth status:', error);
                setIsAuthenticated(false);
            }
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
