import React, { useEffect, useState } from 'react';

import Form from './components/transferForm';
import { theme } from 'styles/theme';
import Loader from 'components/loader';
import useUserStore from 'stores/userStore';
import CustomButton from 'components/button';
import claimTokenAbi from 'contracts/claimTokenAbi.json';
import ImageList from './components/imageList';

import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

import User from 'images/user.png';
import style from './home.module.css';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = '0xdA8567DDd93FA9aA8C60600e333F42ab8aA7d53a';

const contract = new ethers.Contract(contractAddress, claimTokenAbi, signer);

const Home = () => {
    const [ready, setReady] = useState(false);
    const [balance, setBalance] = useState(0);
    const [tokenName, setTokenName] = useState('');

    const user = useUserStore(state => state.user);

    useEffect(() => {
        getCurrentBalance();
    }, []);

    const getCurrentBalance = async () => {
        try {
            const { accountAddress } = user;
            const userBalance = await contract.balanceOf(accountAddress);

            const hex = userBalance?._hex;

            const amount = parseInt(hex);

            setBalance(amount);

            await getTokenName();

            setReady(true);
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    const getTokenName = async () => {
        const name = await contract.name();
        setTokenName(name);
    };

    const claimPrcTokens = async () => {
        try {
            const claim = await contract.claimTokens(user.accountAddress);

            toast.success('Tokens claimed successfully', {
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    const onSubmitForm = async formData => {
        const { recieverAdd, amount } = formData;

        try {
            const sendPrc = await contract.transfer(recieverAdd, amount);

            toast.success('Tokens transferred successfully', {
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
            console.error('Error', error);
        }
    };

    return (
        <>
            {ready ? (
                <>
                    <div
                        style={{
                            backgroundColor: '#D3D3D3',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 20,
                        }}>
                        <img
                            src={User}
                            alt="Avatar"
                            className={style.userAvatar}></img>

                        <div>
                            <h2>
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <div
                                style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    gap: 20,
                                }}>
                                <div
                                    style={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                    }}>
                                    <small>Account Address</small>

                                    <small>{user?.accountAddress}</small>
                                </div>

                                <div
                                    style={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                    }}>
                                    <small>Email Address</small>

                                    <small>{user?.email}</small>
                                </div>

                                <div
                                    style={{
                                        flexDirection: 'column',
                                        display: 'flex',
                                    }}>
                                    <small>Phone Number</small>

                                    <small>{user?.phoneNo}</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ marginTop: 50 }}>
                                <h2 className={style.heading}>
                                    Current Balance
                                </h2>

                                <h4
                                    style={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        width: '40%',
                                        gap: 10,
                                    }}>
                                    {balance} {tokenName}
                                    <ThemeProvider theme={theme}>
                                        <CustomButton
                                            title="Refresh"
                                            icon={<RefreshIcon />}
                                            onClick={getCurrentBalance}
                                            size="small"
                                        />
                                    </ThemeProvider>
                                </h4>

                                <br></br>

                                <CustomButton
                                    title="Claim PRC"
                                    size="large"
                                    icon={<CallReceivedIcon />}
                                    onClick={claimPrcTokens}
                                />
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <h2 className={style.heading}>
                                    Transfer Tokens
                                </h2>

                                <Form onSubmit={onSubmitForm} />
                            </div>
                        </div>

                        <div
                            style={{
                                width: '40%',
                                height: 450,
                                marginTop: 50,
                            }}>
                            <h2
                                style={{
                                    textAlign: 'center',
                                    fontFamily:
                                        'Gill Sans,Gill Sans MT, Calibri, Trebuchet MS, sans-serif',
                                }}>
                                Advertisments
                            </h2>

                            <ImageList />
                        </div>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
