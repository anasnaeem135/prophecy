import React from 'react';

import Form from './components/form';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from 'styles/theme';
import { loginApi } from './helpers/api';
import useUserStore from 'stores/userStore';

import style from './Login.module.css';
import ProphecyLogo from 'images/icon.png';

const Login = ({ visible }) => {
    const navigate = useNavigate();

    const onSubmitForm = async formData => {
        const response = await loginApi(formData);

        if (response?.status === 200) {
            useUserStore.setState({ user: response.data.user });
            if (formData.remember === true) {
                const data = JSON.stringify(formData);
                localStorage.setItem('isLoggedIn', data);
            }
            setTimeout(() => {
                navigate('/connectWallet', { replace: true });
            }, 1500);
        }
    };

    const handleClickClose = () => {
        visible(false);
    };

    return (
        <>
            <div className={style.card}>
                <div className={style.closeButton}>
                    <ThemeProvider theme={theme}>
                        <IconButton onClick={handleClickClose}>
                            <CloseIcon color="primary" />
                        </IconButton>
                    </ThemeProvider>
                </div>

                <img src={ProphecyLogo} alt="app logo" />

                <Form onSubmit={onSubmitForm} />
            </div>

            <ToastContainer />
        </>
    );
};

export default Login;
