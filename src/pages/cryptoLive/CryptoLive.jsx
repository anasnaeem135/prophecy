import React from 'react';

import CardSlider from './components/cardSlider';

import Header from 'components/header/header';
import style from './CryptoLive.module.css';

import Form from './components/form';

const CryptoLive = () => {
    const handleSubmit = v => {
        console.log(v);
    };

    return (
        <>
            <Header
                button1={false}
                button2={{ show: true, title: 'Sports Live' }}
                button3={{ show: true, title: 'Logout' }}
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

export default CryptoLive;
