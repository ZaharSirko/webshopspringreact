import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {request} from "../../helpers/axios_helper";

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [matchingPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleSignup = async () => {
        try {
            if (!email || !password || !matchingPassword ) {
                setError('Please fill in all fields.');
                return;
            }

            if (password !== matchingPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await request("post",'http://localhost:8080/sign-in', {
                email,
                password,
            });
            console.log(response.data);
            history('/');
        } catch (error) {

            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '600px', height: 'auto' }}>
                <div className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="matchingPassword"
                            placeholder="Confirm Password"
                            value={matchingPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary mb-4 d-block mx-auto"
                        style={{ height: '40px', width: '100%' }}
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>
                    <div className="text-center">
                        <p>Already Register? <a href="/log-in">Login</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
