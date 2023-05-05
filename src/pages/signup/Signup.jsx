import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Signup.module.css';

import Form from './components/form';
import Header from 'components/header/header';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { signupApi } from './helpers/api';

const Signup = () => {
    const navigate = useNavigate();

    const onSubmitForm = async formData => {
        const response = await signupApi(formData);

        if (response?.status === 200) {
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1500);
        }
    };

    return (
        <>
            <Header button2={false} button3={false} />

            <div className={style.body}>
                <div className={style.card}>
                    <img src={ProphecyLogo} alt="app logo" />

                    <Form onSubmit={onSubmitForm} />
                </div>

                <div className={style.ellipse1}></div>

                <div className={style.ellipse2}></div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Signup;
