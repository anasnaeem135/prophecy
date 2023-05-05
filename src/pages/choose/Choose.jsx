import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/header/header';
import style from './Choose.module.css';

import CustomButton from 'components/button';

const Choose = () => {
    const navigate = useNavigate();

    const navigateToCryptoLive = () => {
        navigate('/connectWallet/choose/cryptoLive');
    };

    const navigateToSportsLive = () => {
        navigate('/connectWallet/choose/sportsLive');
    };

    return (
        <>
            <Header
                button1={false}
                button2={false}
                button3={{ show: true, title: 'Logout' }}
            />

            <div className={style.body}>
                <div className={style.view}>
                    <CustomButton
                        title="Crypto Currency Live"
                        size="large"
                        color="primary"
                        onClick={navigateToCryptoLive}
                    />
                    <p className={style.fontLink}>
                        Join a pool of players and predict the value of a listed
                        crypto currency after a set amount of time and get a
                        chance to win PRC tokens.
                    </p>
                </div>

                <div className={style.divider}></div>

                <div className={style.view}>
                    <CustomButton
                        title="Sports Prediction Live"
                        size="large"
                        color="primary"
                        onClick={navigateToSportsLive}
                    />
                    <p className={style.fontLink}>
                        Join a pool of players and predict the outcome of a
                        listed sport and get a chance to win PRC tokens.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Choose;
