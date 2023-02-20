import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/landingPage/LandingPage';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import ConnectWallet from 'pages/connectWallet/ConnectWallet';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/connectWallet" element={<ConnectWallet />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
