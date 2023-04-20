import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/landingPage/LandingPage';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';

const AuthStack = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default AuthStack;
