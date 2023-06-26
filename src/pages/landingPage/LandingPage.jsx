import React, { useState } from 'react';

import Login from 'pages/login/Login';
import Loader from 'components/loader';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

import Graph from 'images/cube.png';
import style from './LandingPage.module.css';
import FlowDiagram from 'images/flow-diagram.png';

const LandingPage = ({ show }) => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            {show ? (
                <>
                    <Header visible={setShowLogin} />

                    <div className={style.top}>
                        <div className={style.view}>
                            <div className={style.contentDiv}>
                                <h1 className={style.title1}>Who are we?</h1>

                                <p>
                                    Prophecy, a non-custodial prediction market
                                    protocol on BSC Blockchain allows the user
                                    to use their skills to predict the future
                                    value of asset like ETH, BTC on hourly,
                                    daily, weekly time frames along with
                                    streaming services of sports and e-sports.
                                    Additionally, it rewards users for making
                                    accurate predictions and allows them to
                                    receive PRC tokens. Users of the Prophecy
                                    platform can take use of prediction and
                                    content. The platform is energized by user
                                    participation and may serve as a venue for
                                    the exposure of adverts. An advertiser or a
                                    businesses can purchase PRC tokens on an
                                    exchange and use them to pay for platform
                                    advertising slots.
                                </p>
                            </div>
                            <img
                                src={Graph}
                                alt="Graph"
                                className={style.graph}></img>
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
            ) : (
                <div
                    style={{
                        top: '50%',
                        left: ' 50%',
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <Loader thickness={20} size={200} />
                </div>
            )}
        </>
    );
};

export default LandingPage;
