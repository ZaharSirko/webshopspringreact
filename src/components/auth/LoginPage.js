import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.status === false) {
                setError(response.message || 'Login failed');
            } else {
                navigate("/");
            }
        } catch (error) {
            setError('Email or password was incorrect!.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 mt-5">
                    <h2 onClick={() => navigate('/')}
                        className="clickable-heading mb-4 link-body-emphasis text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                             fill="currentColor" className="bi me-2">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.25-11.03c-.18.19-.3.44-.3.72v6.62c0 .28.22.5.5.5s.5-.22.5-.5v-5.2l3.75 3.75c.2.2.51.2.71 0s.2-.51 0-.71L12.48 8.76c-.2-.2-.51-.2-.71 0l-4.48 4.48c-.2.2-.2.51 0 .71s.51.2.71 0L11 10.88v5.2c0 .28.22.5.5.5s.5-.22.5-.5v-6.62c0-.28-.12-.53-.3-.72z"/>
                        </svg>
                        Log in
                    </h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleLogin} className="needs-validation" noValidate>
                        <div className="form-group">
                            <label htmlFor="username">Login</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Enter login
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">
                                Enter password
                            </div>
                            <small className="form-text text-muted">
                                Don't have an account? <a href="/sign-in">Register here</a>
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-4">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
