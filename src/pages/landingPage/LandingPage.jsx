import React, { useState } from 'react';

import Header from 'components/header/header';

import { useNavigate } from 'react-router-dom';
import Footer from 'components/footer/footer';
import Login from 'pages/login/Login';
import style from './LandingPage.module.css';

import FlowDiagram from 'images/flow-diagram.png';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Header visible={setShowLogin} />
            <div className={style.top}>
                <div className={style.contentDiv}>
                    <h1 className={style.title1}>Who are we?</h1>
                    <p>
                        Prophecy, a non-custodial prediction market protocol on
                        BSC Blockchain allows the user to use their skills to
                        predict the future value of asset like ETH, BTC on
                        hourly, daily, weekly time frames along with streaming
                        services of sports and e-sports. Additionally, it
                        rewards users for making accurate predictions and allows
                        them to receive PRC tokens. Users of the Prophecy
                        platform can take use of prediction and content. The
                        platform is energized by user participation and may
                        serve as a venue for the exposure of adverts. An
                        advertiser or a businesses can purchase PRC tokens on an
                        exchange and use them to pay for platform advertising
                        slots.
                    </p>
                </div>
                {showLogin ? <Login /> : null}
            </div>
            <h1 className={style.title2}>How do we Operate?</h1>
            <img
                src={FlowDiagram}
                alt="Flow Diagram"
                className={style.img}></img>
            <Footer />
        </>
    );
};

export default LandingPage;
