import React from 'react';

import './ConnectWallet.css';

import CustomButton from 'components/button';
import WalletIcon from '@mui/icons-material/Wallet';

const ConnectWalltet = () => {
    return (
        <div className="body">
            <h1 className="title">
                Before you start using our platform you need to connect your
                MetaMask wallet!
            </h1>

            <br></br>

            <CustomButton
                size="large"
                title="Connect Wallet"
                icon={<WalletIcon />}
            />
        </div>
    );
};

export default ConnectWalltet;
