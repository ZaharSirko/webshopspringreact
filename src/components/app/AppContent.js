import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Profile from '../user/Profile';
import GoodList from '../good/GoodList';
import GoodDetail from '../good/GoodDetails';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../auth/SignUpPage';
import Dashboard from "../auth/Dashboard";
import Header from "../block/Header";

import EditProfile from "../user/EditProfile";
import {AuthProvider, useAuth} from "../auth/AuthProvider";
import {ProfileProvider} from "../user/ProfileContext";
import GoogleLoginComponent from "../auth/GoogleLoginComponent";
import AddGood from "../good/AddGood";
import AddPrice from "../price/AddPrice";
import EditePrice from "../price/EditePrice";




const AppContent = () => {
    return (
        <AuthProvider>
                <div>
                    <Router>
                        <Header/>
                        <Routes>
                            <Route path="/log-in" element={<LoginPage />} />
                            <Route path="/oauth2/google" element={<GoogleLoginComponent />} />
                            <Route path="/sign-in" element={<SignupPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/" element={<GoodList />} />
                            <Route path="/good/:id" element={<GoodDetail />} />
                            <Route path="/good/add" element={<AddGood />} />
                            <Route path="/profile" element={ <ProfileProvider> <Profile/>  </ProfileProvider>} />
                            <Route path="/profile/edit" element={<ProfileProvider>  <EditProfile />  </ProfileProvider>} />
                            <Route path="/price/add" element={<AddPrice/>}/>
                            <Route path="/price/edite/:priceId" element={<EditePrice/>}/>
                        </Routes>
                    </Router>
                </div>
        </AuthProvider>
    );
};


export default AppContent;
