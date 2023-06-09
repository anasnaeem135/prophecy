import React, { useEffect, useState } from 'react';

import User from 'images/user.png';
import styles from '../Dashboard.module.css';
import Loader from 'components/loader';
import useUserStore from 'stores/userStore';
import claimTokenAbi from 'contracts/claimTokenAbi.json';
import Form from './transferForm';
import CustomButton from 'components/button';

import Web3 from 'web3';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';
import RefreshIcon from '@mui/icons-material/Refresh';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const web3 = new Web3(window.etherium);
const signer = provider.getSigner();
const contractAddress = '0x28d730206EDaDC364B0dd15696765EBd703C35e7';
const contract = new ethers.Contract(contractAddress, claimTokenAbi, signer);

const Home = () => {
    const user = useUserStore(state => state.user);
    const [ready, setReady] = useState(false);
    const [balance, setBalance] = useState(0);
    const [tokenName, setTokenName] = useState('');

    useEffect(() => {
        getCurrentBalance();
    }, []);

    const getCurrentBalance = async () => {
        try {
            const userBalance = await contract.balanceOf(user.accountAddress);

            const hex = userBalance?._hex;

            const amount = web3.utils.hexToBytes(hex);
            setBalance(amount[0]);

            await getTokenName();

            setReady(true);
        } catch (error) {
            console.error('Error:', error);
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
            console.error('Error:', error);
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
                            className={styles.userAvatar}></img>

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

                    <div style={{ marginTop: 50 }}>
                        <h2>Current Balance</h2>

                        <h4
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '20%',
                            }}>
                            {balance} {tokenName}
                            <ThemeProvider theme={theme}>
                                <CustomButton
                                    title="Refresh"
                                    icon={<RefreshIcon />}
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
                        <h2>Transfer Tokens</h2>

                        <Form onSubmit={onSubmitForm} />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
