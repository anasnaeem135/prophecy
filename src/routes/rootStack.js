import React from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/landingPage/LandingPage';
import Signup from 'pages/signup/Signup';

import ConnectWallet from 'pages/connectWallet/ConnectWallet';
import Choose from 'pages/choose/Choose';
import CryptoLive from 'pages/cryptoLive/CryptoLive';
import SportsLive from 'pages/sportsLive/SportsLive';
import Dashboard from 'pages/dashboard/Dashboard';

const RootStack = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/connectWallet" element={<ConnectWallet />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/connectWallet/choose" element={<Choose />} />
            <Route
                path="/connectWallet/choose/cryptoLive"
                element={<CryptoLive />}
            />
            <Route
                path="/connectWallet/choose/sportsLive"
                element={<SportsLive />}
            />
        </Routes>
    );
};

export default RootStack;
