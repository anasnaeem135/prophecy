import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Login.module.css';

import Form from './components/form';
import Divider from 'components/divider/divider';
import Header from 'components/header/header';

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onSubmitForm = formData => {
        navigate('connectWallet');
    };

    return (
        <>
            <Header />
            {/* <div className={style.body}>
                <div className={style.card}>
                    <img src={ProphecyLogo} alt="app logo" />
                    <Divider />
                    <Form onSubmit={onSubmitForm} />
                </div>
            </div> */}
        </>
    );
};

export default Login;
