import React from 'react';
import User from 'images/user.png';
import styles from '../Dashboard.module.css';

import useUserStore from 'stores/userStore';

const Home = () => {
    const user = useUserStore(state => state.user);

    console.log(user);

    return (
        <>
            <div
                style={{
                    backgroundColor: '#D3D3D3',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                }}>
                <img
                    src={User}
                    alt="Avatar"
                    className={styles.userAvatar}></img>

                <div>
                    <h2>
                        {user?.firstName} {user?.lastName}
                    </h2>
                    <div
                        style={{
                            flexDirection: 'row',
                            display: 'flex',
                            gap: 20,
                        }}>
                        <div
                            style={{
                                flexDirection: 'column',
                                display: 'flex',
                            }}>
                            <small>Account Address</small>

                            <small>{user?.accountAddress}</small>
                        </div>

                        <div
                            style={{
                                flexDirection: 'column',
                                display: 'flex',
                            }}>
                            <small>Email Address</small>

                            <small>{user?.email}</small>
                        </div>

                        <div
                            style={{
                                flexDirection: 'column',
                                display: 'flex',
                            }}>
                            <small>Phone Number</small>

                            <small>{user?.phoneNo}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 50 }}>
                <h2>Balance </h2>

                <h3>258 PRC Tokens</h3>

                <small>
                    This is the current amount of token you have in your
                    MetaMask Wallet
                </small>
            </div>

            <div style={{ marginTop: 50 }}>
                <h2>Markets </h2>

                <small>
                    This is the current amount of token you have in your
                    MetaMask Wallet
                </small>
            </div>
        </>
    );
};

export default Home;
