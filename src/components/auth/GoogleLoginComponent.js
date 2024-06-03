import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { request } from  '../../helpers/axios_helper'; // Імпорт axios_helper

const GoogleLoginComponent = () => {
    const navigate = useNavigate();

    const handleGoogleSuccess = async (response) => {
        try {
            const { credential } = response;

            const res = await request('post', '/oauth2/google', { token: credential }); // Використовуємо axios_helper для відправки запиту
            const { jwt } = res.data;
            localStorage.setItem('auth_token', jwt);
            navigate('/profile');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleFailure = (error) => {
        console.error('Login failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="844966993504-dslmsij1v4am0e08jro6s2pvliu7bda9.apps.googleusercontent.com">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginComponent;
