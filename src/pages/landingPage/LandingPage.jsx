import React, { useState, useEffect } from 'react';

import Header from 'components/header/header';

import Footer from 'components/footer/footer';
import Login from 'pages/login/Login';
import style from './LandingPage.module.css';

import FlowDiagram from 'images/flow-diagram.png';
import Graph from 'images/cube.png';
import { ethers } from 'ethers';
import Web3 from 'web3';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);

    const provider = new ethers.providers.JsonRpcProvider(
        'HTTP://127.0.0.1:7545',
    );

    return (
        <>
            <Header visible={setShowLogin} />

            <div className={style.top}>
                <div className={style.view}>
                    <div className={style.contentDiv}>
                        <h1 className={style.title1}>Who are we?</h1>

                        <p>
                            Prophecy, a non-custodial prediction market protocol
                            on BSC Blockchain allows the user to use their
                            skills to predict the future value of asset like
                            ETH, BTC on hourly, daily, weekly time frames along
                            with streaming services of sports and e-sports.
                            Additionally, it rewards users for making accurate
                            predictions and allows them to receive PRC tokens.
                            Users of the Prophecy platform can take use of
                            prediction and content. The platform is energized by
                            user participation and may serve as a venue for the
                            exposure of adverts. An advertiser or a businesses
                            can purchase PRC tokens on an exchange and use them
                            to pay for platform advertising slots.
                        </p>
                    </div>
                    <img src={Graph} alt="Graph" className={style.graph}></img>
                </div>
                {showLogin ? <Login visible={setShowLogin} /> : null}
            </div>

            <h1 className={style.title2}>Our Mode of Operations</h1>
            <img
                src={FlowDiagram}
                alt="Flow Diagram"
                className={style.img}></img>
            <Footer />
        </>
    );
};

export default LandingPage;
