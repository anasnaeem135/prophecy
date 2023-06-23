import React from 'react';

import { ToastContainer } from 'react-toastify';

import Form from './components/advertismentForm';
import { uploadAdvertisment } from './helpers/api';

import style from './advertisment.module.css';

const Advertisment = () => {
    const uploadHandler = value => {
        uploadAdvertisment(value);
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
