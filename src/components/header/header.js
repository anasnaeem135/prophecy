import React from 'react';
import HeaderLogo from 'images/logo-bg-white.png';
import style from './header.module.css';
import CustomButton from 'components/button';

const Header = () => {
    return (
        <div className={style.main}>
            <img
                src={HeaderLogo}
                alt="Header Logo"
                className={style.logo}></img>

            <b className={style.title}>
                Prophecy - Blockchain Based Prediction Platform
            </b>

            <div className={style.buttonBox}>
                <button className={style.button}>Home</button>
                <button className={style.button}>About Us</button>
                <CustomButton title="Login" size="large" />
            </div>
        </div>
    );
};

export default Header;
