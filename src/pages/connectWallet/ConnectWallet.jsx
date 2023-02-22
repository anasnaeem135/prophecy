import React from 'react';
import Header from 'components/header/header';
import style from './ConnectWallet.module.css';

import ProphecyLogo from 'images/icon.png';

import { ConnectButton } from '@web3uikit/web3';

const ConnectWalltet = () => {
    return (
        // <div className={style.body}>
        //     <h1 className={style.title}>
        //         Before you start using our platform you need to connect your
        //         wallet!
        //     </h1>

        //     <br></br>

        //     <div>
        //         <ConnectButton
        //             moralisAuth={true}
        //             signingMessage={'Wallet connected succesfully'}
        //         />
        //     </div>
        // </div>
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
                            <ConnectButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConnectWalltet;
