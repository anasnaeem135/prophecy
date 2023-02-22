import React from 'react';
import HeaderLogo from 'images/logo-bg-white.png';
import style from './header.module.css';
import CustomButton from 'components/button';
import { useNavigate } from 'react-router-dom';

const Header = ({ visible, login = true, home = true, aboutUs = true }) => {
    const navigate = useNavigate();

    const handleClickLogin = () => {
        visible(true);
    };

    const handleClickHome = () => {
        navigate(-1);
    };

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
                {home ? (
                    <button className={style.button} onClick={handleClickHome}>
                        Home
                    </button>
                ) : null}

                {aboutUs ? (
                    <button className={style.button}>About Us</button>
                ) : null}

                {login ? (
                    <CustomButton
                        title="Login"
                        size="large"
                        onClick={handleClickLogin}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Header;
