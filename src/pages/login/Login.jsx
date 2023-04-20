import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Login.module.css';

import Form from './components/form';
import Divider from 'components/divider/divider';
import Header from 'components/header/header';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onSubmitForm = async formData => {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();
        console.log('Response : ', res);
    };

    return (
        <>
            <div className={style.card}>
                <img src={ProphecyLogo} alt="app logo" />

                <Form onSubmit={onSubmitForm} />
            </div>
        </>
    );
};

export default Login;
