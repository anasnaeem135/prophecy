import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';

const Routing = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
