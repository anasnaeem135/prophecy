import React from 'react';
import LogoBgWhite from 'images/logo-bg-white.png';
import style from './footer.module.css';
import CustomButton from 'components/button';

const Footer = () => {
    return (
        <div className={style.main}>
            <div className={style.group1}>
                <img
                    src={LogoBgWhite}
                    alt="Header Logo"
                    className={style.logo}></img>

                <b className={style.title}>
                    Prophecy - Blockchain Based Prediction Platform
                </b>
            </div>

            <div className={style.group2}>
                <b className={style.title}>Prophecy Links</b>
                <CustomButton title="Home" size="medium" />
                <CustomButton
                    title="About Us"
                    size="medium"
                    color="secondary"
                />
            </div>
        </div>
    );
};

export default Footer;
