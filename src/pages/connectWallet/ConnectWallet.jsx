import React, { useState, useEfect } from 'react';
import Header from 'components/header/header';
import style from './ConnectWallet.module.css';
import ProphecyLogo from 'images/icon.png';

import { useMoralis } from 'react-moralis';
import CustomButton from 'components/button';
import { ConnectButton } from '@web3uikit/web3';

const ConnectWalltet = () => {
    const [address, setAddress] = useState();
    const [disable, setDisable] = useState(false);
    // useEfect(() => {
    //     handleConnectButton();
    // }, []);

    const handleConnectButton = () => {
        if (window !== undefined) {
            connectMetamask().then(response => {
                setAddress(response);
                setDisable(true);
            });

            // console.log('The address is : ', address);
        }
    };

    async function connectMetamask() {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        const account = accounts[0];

        return account;
    }

    return (
        <>
            <Header home={false} aboutUs={false} />

            <div className={style.body}>
                <div className={style.card}>
                    <img src={ProphecyLogo} alt="app logo" />

                    <div className={style.div}>
                        <h2 className={style.heading}>
                            Press on the connect wallet button to connect your
                            crypto wallet with Prophecy
                        </h2>

                        <div className={style.button}>
                            {/* <ConnectButton /> */}
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
                </div>
            </div>
        </>
    );
};

export default ConnectWalltet;
