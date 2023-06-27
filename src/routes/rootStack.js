import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import Signup from 'pages/signup/Signup';
import useUserStore from 'stores/userStore';
import Dashboard from 'pages/dashboard/Dashboard';
import { loginApi } from 'pages/login/helpers/api';
import LandingPage from 'pages/landingPage/LandingPage';
import ConnectWallet from 'pages/connectWallet/ConnectWallet';

import Admin from 'pages/admin/Admin';

const RootStack = () => {
    const navigate = useNavigate();

    const [ready, setReady] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('isLoggedIn');

        if (data) {
            const parsedData = JSON.parse(data);
            loginApiHandler(parsedData);
        } else {
            setReady(true);
        }
    }, []);

    const loginApiHandler = async data => {
        const response = await loginApi(data);

        if (response?.status === 200) {
            useUserStore.setState({ user: response.data.user });

            setTimeout(() => {
                navigate('/connectWallet', { replace: true });
                setReady(true);
            }, 1500);
        } else {
            setReady(true);
            toast.error(response?.message, { hideProgressBar: true });
        }
    };

    return (
        <Routes>
            <Route path="/" element={<LandingPage show={ready} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/connectWallet" element={<ConnectWallet />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
};

export default RootStack;
