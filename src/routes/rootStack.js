import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Signup from 'pages/signup/Signup';
import Dashboard from 'pages/dashboard/Dashboard';
import LandingPage from 'pages/landingPage/LandingPage';
import ConnectWallet from 'pages/connectWallet/ConnectWallet';

import { loginApi } from 'pages/login/helpers/api';

const RootStack = () => {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     const data = localStorage.getItem('isLoggedIn');
    //     loginApiHandler(data);
    // }, []);

    // const loginApiHandler = async data => {
    //     const response = await loginApi(data);

    //     console.log('Response ', response);

    //     if (response?.status === 200) {
    //         setTimeout(() => {
    //             navigate('/connectWallet', { replace: true });
    //         }, 1500);
    //     }
    // };

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/connectWallet" element={<ConnectWallet />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default RootStack;
