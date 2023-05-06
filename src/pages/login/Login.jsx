import React from 'react';

import ProphecyLogo from 'images/icon.png';
import style from './Login.module.css';

import Form from './components/form';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';
import { useNavigate } from 'react-router-dom';

import { loginApi } from './helpers/api';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Login = ({ visible }) => {
    const navigate = useNavigate();

    const onSubmitForm = async formData => {
        const response = await loginApi(formData);

        if (response?.status === 200) {
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
