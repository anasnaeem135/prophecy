import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ConnectWallet from 'pages/connectWallet/ConnectWallet';
import Choose from 'pages/choose/Choose';
import CryptoLive from 'pages/cryptoLive/CryptoLive';
import SportsLive from 'pages/sportsLive/SportsLive';

const RootStack = () => {
    return (
        <Routes>
            <Route path="/connectWallet" element={<ConnectWallet />} />
            <Route path="/choose" element={<Choose />} />
            <Route path="/cryptoLive" element={<CryptoLive />} />
            <Route path="/sportsLive" element={<SportsLive />} />
        </Routes>
    );
};

export default RootStack;
