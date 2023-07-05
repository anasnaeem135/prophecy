import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import CustomButton from 'components/button';
import StartPoolForm from './components/startPoolForm';
import EndPoolForm from './components/endPoolForm';
import claimTokenAbi from 'contracts/abi.json';

import style from './Admin.module.css';

import { CONTRACT_ADDRESS } from 'appConstants';
import { ethers } from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, claimTokenAbi, signer);

const Admin = () => {
    const [disable, setDisable] = useState(false);
    const [address, setAddress] = useState();

    console.log(CONTRACT_ADDRESS);

    const handleConnectButton = () => {
        if (window.ethereum !== undefined) {
            connectMetamask()
                .then(response => {
                    setAddress(response);
                    setDisable(true);
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

    const handleSubmitStartPool = async values => {
        try {
            const { time } = values;

            await contract.startPool(time);
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    const handleSubmitEndPool = async values => {
        try {
            const { currentPrice, orignalPrice } = values;

            await contract.endPool(currentPrice, orignalPrice);
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    return (
        <div className={style.main}>
            <CustomButton
                title="Connect to MetaMask"
                size="large"
                disable={disable}
                onClick={handleConnectButton}
            />

            {address ? (
                <p className={style.heading}>Account Address : {address}</p>
            ) : null}

            <br></br>

            <StartPoolForm onSubmit={handleSubmitStartPool} />

            <EndPoolForm onSubmit={handleSubmitEndPool} />

            <ToastContainer />
        </div>
    );
};

export default Admin;
