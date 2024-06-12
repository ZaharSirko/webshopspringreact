import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoRoleAdminButton = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>You do not have admin access</h1>
            <button onClick={goToHome} className="btn btn-primary">Go to Home</button>
        </div>
    );
};

export default NoRoleAdminButton;
