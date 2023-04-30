import React, { useState, useEffect } from 'react';

import CardSlider from './components/cardSlider';

import Header from 'components/header/header';
import style from './CryptoLive.module.css';

import Form from './components/form';
import { useNavigate } from 'react-router-dom';

import getCurrentPrices from './getCurrentPrices';

const CryptoLive = () => {
    const [prices, setPrices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrices = async () => {
            const cryptocurrencies = ['BTC', 'ETH', 'LTC'];
            const prices = await getCurrentPrices(cryptocurrencies);

            console.log(prices);
            setPrices(prices);
        };

        fetchPrices();
    }, []);

    const handleSubmit = v => {
        console.log(v);
    };

    const handleClick = () => {
        navigate('/connectWallet/choose/sportsLive');
    };

    const handleLogout = () => {
        navigate('/', { replace: true });
    };

    // console.log('Prices : ', prices);

    return (
        <>
            <Header
                button1={false}
                button2={{ show: true, title: 'Sports Live' }}
                button3={{ show: true, title: 'Logout' }}
                onClick2={handleClick}
                onClick3={handleLogout}
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
