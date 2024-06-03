import React, { useState, useEffect } from 'react';
import { request } from '../../helpers/axios_helper';
import { useProfile } from './ProfileContext';

const EditProfile = () => {
    const { profile, setProfile } = useProfile();
    const [formData, setFormData] = useState({
        username: '',
        real_name: '',
        phoneNumber: '',
        adress: '',
        email:''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                real_name: profile.real_name || '',
                phoneNumber: profile.phoneNumber || '',
                adress: profile.adress || '',
                email: profile.email || ''
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request('put', '/profile/edit',formData);
            if (response.data) {
                setProfile({ ...profile, ...formData });
                alert('Profile updated successfully');
                // Optionally, refresh the profile data or redirect the user
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User Name</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled
                />
            </div>
            <div>
                <label>Name</label>
                <input
                    type="text"
                    name="real_name"
                    value={formData.real_name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Phone</label>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.adress}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default EditProfile;
