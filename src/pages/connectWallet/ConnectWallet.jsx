import React from 'react';

import style from './ConnectWallet.module.css';

import { ConnectButton } from '@web3uikit/web3';

const ConnectWalltet = () => {
    return (
        <div className={style.body}>
            <h1 className={style.title}>
                Before you start using our platform you need to connect your
                wallet!
            </h1>

            <br></br>

            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    );
};

export default ConnectWalltet;
