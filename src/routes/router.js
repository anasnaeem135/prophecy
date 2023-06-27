import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from 'pages/admin/Admin';
import RootStack from './rootStack';

const Routing = () => {
    return (
        <BrowserRouter>
            <RootStack />
            <Routes>
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
