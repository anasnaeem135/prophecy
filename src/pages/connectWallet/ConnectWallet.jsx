import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { ToastContainer, toast } from 'react-toastify';

import useUserStore from 'stores/userStore';
import CustomButton from 'components/button';

import ProphecyLogo from 'images/icon.png';
import Header from 'components/header/header';
import style from './ConnectWallet.module.css';

const ConnectWalltet = () => {
    const [address, setAddress] = useState();
    const [disable, setDisable] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const user = useUserStore(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (address) {
            toast.success('MetaMask Connected Successfully', {
                hideProgressBar: true,
            });
        }
    }, [address]);

    const navigateToChoose = () => {
        navigate('/dashboard', { replace: true });
    };

    const handleConnectButton = () => {
        if (window.ethereum !== undefined) {
            connectMetamask()
                .then(response => {
                    setAddress(response);
                    setDisable(true);
                    setShowButton(true);
                    user.accountAddress = response;
                    useUserStore.setState({ user });
                })
                .catch(err => {
                    toast.error('Error connecting to MetaMask', {
                        hideProgressBar: true,
                    });
                });
        } else {
            toast.warn('Install the MetaMask extension to continue', {
                hideProgressBar: true,
            });
        }
    };

    async function connectMetamask() {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        const account = accounts[0];
        return account;
    }

    const handleLogoutUser = () => {
        try {
            localStorage.removeItem('isLoggedIn');

            toast.success('Logged Out Successfully', { hideProgressBar: true });

            setTimeout(() => {
                navigate('/', { replace: true });
                useUserStore.setState({ user: null });
            }, 1500);
        } catch (error) {
            toast.error(error, { hideProgressBar: true });
        }
    };

    return (
        <>
            <Header
                button1={false}
                button2={false}
                button3={{ show: true, title: 'Logout' }}
                onClick3={handleLogoutUser}
            />

            <div className={style.body}>
                <div className={style.card}>
                    <img src={ProphecyLogo} alt="app logo" />

                    <div className={style.div}>
                        <h2 className={style.heading}>
                            Press on the connect wallet button to connect your
                            MetaMask with Prophecy
                        </h2>

                        <div className={style.button}>
                            <CustomButton
                                title="Connect Wallet"
                                size="large"
                                onClick={handleConnectButton}
                                disable={disable}
                            />
                        </div>

                        {address ? (
                            <p className={style.heading}>
                                Account Address : {address}
                            </p>
                        ) : null}
                    </div>

                    {showButton ? (
                        <div className={style.nextBtn}>
                            <CustomButton
                                size="large"
                                icon={<SendIcon />}
                                title="Next"
                                onClick={navigateToChoose}
                            />
                        </div>
                    ) : null}
                </div>

                <div className={style.ellipse1}></div>

                <div className={style.ellipse2}></div>
            </div>

            <ToastContainer />
        </>
    );
};

export default ConnectWalltet;
