import React from 'react';

import { ToastContainer } from 'react-toastify';

import Form from './components/advertismentForm';
import { uploadAdvertisment } from './helpers/api';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import claimTokenAbi from 'contracts/claimTokenAbi.json';

import style from './advertisment.module.css';
const provider = new ethers.providers.Web3Provider(window.ethereum);
// const web3 = new Web3(window.etherium);+
const signer = provider.getSigner();
// const contractAddress = '0x28d730206EDaDC364B0dd15696765EBd703C35e7';
const contractAddress = '0xdA8567DDd93FA9aA8C60600e333F42ab8aA7d53a';
const contract = new ethers.Contract(contractAddress, claimTokenAbi, signer);

const Advertisment = () => {
    const uploadHandler = async value => {
        try {
            const { amount, file } = value;
            const response = await contract.transfer(contractAddress, amount);
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
