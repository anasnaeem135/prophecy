import React from 'react';

import { ToastContainer } from 'react-toastify';

import Form from './components/advertismentForm';
import { uploadAdvertisment } from './helpers/api';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import claimTokenAbi from 'contracts/claimTokenAbi.json';
import { CONTRACT_ADDRESS } from 'appConstants';
import style from './advertisment.module.css';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, claimTokenAbi, signer);

const Advertisment = () => {
    const uploadHandler = async value => {
        try {
            const { amount, file } = value;
            await contract.transfer(CONTRACT_ADDRESS, amount);
            uploadAdvertisment(file);
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    return (
        <>
            <div className={style.body}>
                <div className={style.card}>
                    <div>
                        <h1 className={style.title1}>
                            Upload New Advertisment
                        </h1>

                        <Form onSubmit={uploadHandler} />
                    </div>
                </div>

                <div className={style.ellipse1}></div>

                <div className={style.ellipse2}></div>

                <ToastContainer />
            </div>
        </>
    );
};

export default Advertisment;
