import React from 'react';

import CardSlider from './components/cardSlider';

import Header from 'components/header/header';
import style from './CryptoLive.module.css';

const CryptoLive = () => {
    return (
        <>
            <Header />
            <div className={style.body}>
                <CardSlider />
            </div>
        </>
    );
};

export default CryptoLive;
