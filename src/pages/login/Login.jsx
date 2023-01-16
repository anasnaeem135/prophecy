import React from 'react';
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

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ paddingRight: 5 }}
                />

                <Form onSubmit={onSubmitForm} />
            </div>
        </div>
    );
};

export default Login;
