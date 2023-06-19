import React from 'react';
import HeaderLogo from 'images/logo-bg-white.png';
import style from './header.module.css';
import CustomButton from 'components/button';
import { useNavigate } from 'react-router-dom';

const Header = ({
    visible,
    button1 = { show: true, title: 'Home' },
    button2 = { show: true, title: 'About Us' },
    button3 = { show: true, title: 'Login' },
    onClick1,
    onClick2,
    onClick3,
    width = '100%',
    position = 'fixed',
}) => {
    // const [width, setWidth] = useState('100%');
    const navigate = useNavigate();

    const handleClickLogin = () => {
        visible(true);
        window.scrollTo(0, 0);
    };

    const handleClickHome = () => {
        navigate(-1);
    };

    return (
        <div
            className={style.main}
            style={{ width: width, position: position }}>
            <img
                src={HeaderLogo}
                alt="Header Logo"
                className={style.logo}></img>

            <b className={style.title}>
                Prophecy - Blockchain Based Prediction Platform
            </b>

            <div className={style.buttonBox}>
                {button1.show ? (
                    <button
                        className={style.button}
                        onClick={onClick1 || handleClickHome}>
                        {button1.title}
                    </button>
                ) : null}

                {button2.show ? (
                    <button className={style.button} onClick={onClick2}>
                        {button2.title}
                    </button>
                ) : null}

                {button3.show ? (
                    <CustomButton
                        title={button3.title}
                        size="large"
                        onClick={onClick3 || handleClickLogin}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Header;
