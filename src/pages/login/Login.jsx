import React from 'react';

import ProphecyLogo from 'images/icon.png';
import './Login.css';

import Form from './components/form';
import Divider from 'components/divider/divider';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onSubmitForm = formData => {
        navigate('connectWallet');
    };

    return (
        <div className="body">
            <div className="card">
                <img src={ProphecyLogo} alt="app logo" />

                <Divider />

                <Form onSubmit={onSubmitForm} />
            </div>
        </div>
    );
};

export default Login;
