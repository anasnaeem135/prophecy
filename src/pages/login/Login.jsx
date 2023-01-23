import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import ProphecyLogo from 'images/icon.png';
import './Login.css';

import Form from './components/form';

import Divider from '@mui/material/Divider';

const Login = () => {
    const onSubmitForm = formData => {
        alert('Logged in!');
        console.log('This is the main page', formData);
    };

    return (
        <div className="body">
            <div className="card">
                <img src={ProphecyLogo} alt="app logo" />

                <div className="vl"></div>

                <Form onSubmit={onSubmitForm} />
            </div>
        </div>
    );
};

export default Login;
