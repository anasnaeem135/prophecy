import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Signup.module.css';

import Form from './components/form';
import Divider from 'components/divider/divider';
import Header from 'components/header/header';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const onSubmitForm = async formData => {
        console.log(formData);
        const res = await fetch('http://localhost:8080/demo', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(res);

        navigate(-1);
    };

    return (
        <>
            <Header button2={{ show: true, title: 'ok' }} button3={false} />

            <div className={style.body}>
                <div className={style.card}>
                    <img src={ProphecyLogo} alt="app logo" />

                    <Divider />

                    <Form onSubmit={onSubmitForm} />
                </div>
            </div>
        </>
    );
};

export default Signup;
