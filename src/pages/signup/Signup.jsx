import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Signup.module.css';

import Form from './components/form';
import Divider from 'components/divider/divider';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const onSubmitForm = formData => {
        alert('Signed Up!');
        console.log('This is the main page', formData);
        navigate(-1);
    };

    return (
        <div className={style.body}>
            <div className={style.card}>
                <img src={ProphecyLogo} alt="app logo" />

                <Divider />

                <Form onSubmit={onSubmitForm} />
            </div>
        </div>
    );
};

export default Signup;
