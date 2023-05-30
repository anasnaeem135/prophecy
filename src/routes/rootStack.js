import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/landingPage/LandingPage';
import Signup from 'pages/signup/Signup';

import ConnectWallet from 'pages/connectWallet/ConnectWallet';
import Dashboard from 'pages/dashboard/Dashboard';

const RootStack = () => {
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
