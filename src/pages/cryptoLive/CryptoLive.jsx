import React from 'react';

import CardSlider from './components/cardSlider';

import Header from 'components/header/header';
import style from './CryptoLive.module.css';

import { CheckBox } from '@mui/icons-material';

const CryptoLive = () => {
    return (
        <>
            <Header />
            <div className={style.body}>
                <CardSlider />

                <br></br>

                <div className={style.cardContainer}>
                    <CheckBox defaultChecked />
                </div>
            </div>
        </>
    );
};

export default CryptoLive;
