import React from 'react';

import ProphecyLogo from 'images/icon.png';
import './Signup.css';

import Form from './components/form';
import Divider from 'components/divider/divider';

const Signup = () => {
    const onSubmitForm = formData => {
        alert('Signed Up!');
        console.log('This is the main page', formData);
    };

    return (
        <div className="body">
            <div className="card">
                <img src={ProphecyLogo} alt="app logo" />

                {/* <div className="divider"></div> */}
                <Divider />

                <Form onSubmit={onSubmitForm} />
            </div>
        </div>
    );
};

export default Signup;
