import React from 'react';

import CardSlider from './components/cardSlider';

import Header from 'components/header/header';
import style from './SportsLive.module.css';

import Form from './components/form';
import { useNavigate } from 'react-router-dom';

const SportsLive = () => {
    const navigate = useNavigate();
    const handleSubmit = v => {
        console.log(v);
    };

    const handleClick = () => {
        navigate('/connectWallet/choose/cryptoLive');
    };

    return (
        <>
            <Header
                button1={false}
                button2={{ show: true, title: 'Crypto Live' }}
                button3={{ show: true, title: 'Logout' }}
                onClick2={handleClick}
            />
            <div className={style.body}>
                <CardSlider />

                <br></br>

                <div className={style.cardContainer}>
                    <Form onSubmit={handleSubmit} />
                </div>

                <br></br>
            </div>
        </>
    );
};

export default SportsLive;
