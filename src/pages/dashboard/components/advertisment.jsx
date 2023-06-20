import React, { useEffect, useState } from 'react';

import Form from './advertismentForm';

import style from './advertisment.module.css';

const Advertisment = () => {
    const uploadHandler = value => {
        console.log(value);
    };
    return (
        <>
            <div className={style.body}>
                <div className={style.card}>
                    <div>
                        <h1 className={style.title1}>Add New Advertisment</h1>

                        <Form onSubmit={uploadHandler} />
                    </div>
                </div>

                <div className={style.ellipse1}></div>

                <div className={style.ellipse2}></div>
            </div>
        </>
    );
};

export default Advertisment;
