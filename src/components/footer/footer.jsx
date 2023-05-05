import React from 'react';
import LogoBgWhite from 'images/logo-bg-white.png';
import style from './footer.module.css';
import CustomButton from 'components/button';

const Footer = () => {
    const handleClickHome = () => {
        window.scrollTo(0, 0);
    };

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
                <CustomButton
                    title="Home"
                    size="medium"
                    color="secondary"
                    onClick={handleClickHome}
                />
                <CustomButton
                    title="About Us"
                    size="medium"
                    color="secondary"
                />
            </div>

            <div className={style.group3}>
                <b className={style.title}>Contact Us</b>
                <b className={style.title}>+92 333 125 1264</b>
            </div>
        </div>
    );
};

export default Footer;
