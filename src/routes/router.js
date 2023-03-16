import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from 'pages/landingPage/LandingPage';
import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import ConnectWallet from 'pages/connectWallet/ConnectWallet';
import Choose from 'pages/choose/Choose';
import CryptoLive from 'pages/cryptoLive/CryptoLive';
import SportsLive from 'pages/sportsLive/SportsLive';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/connectWallet" element={<ConnectWallet />} />
                <Route path="/choose" element={<Choose />} />
                <Route path="/cryptoLive" element={<CryptoLive />} />
                <Route path="/sportsLive" element={<SportsLive />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
