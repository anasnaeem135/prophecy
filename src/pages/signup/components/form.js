import React, { useState } from 'react';

import { Formik } from 'formik';
import { signupValidationSchema } from '../helpers/validationSchema';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from 'styles/theme';
import '../Signup.css';

const Form = ({
    initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={signupValidationSchema}
            onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                    handleOnClick({ ...values });

                    resetForm();
                }, 500);
            }}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <input
                            className="inputFields"
                            type="name"
                            placeholder="First Name"
                            onChange={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />

                        <br></br>

                        <p className="warning">
                            {errors.firstName &&
                                touched.firstName &&
                                errors.firstName}
                        </p>

                        <br></br>

                        <input
                            className="inputFields"
                            type="name"
                            placeholder="Last Name"
                            onChange={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />

                        <br></br>

                        <p className="warning">
                            {errors.lastName &&
                                touched.lastName &&
                                errors.lastName}
                        </p>

                        <br></br>

                        <input
                            className="inputFields"
                            type="email"
                            placeholder="Email"
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />

                        <br></br>

                        <p className="warning">
                            {errors.email && touched.email && errors.email}
                        </p>

                        <br></br>

                        <input
                            className="inputFields"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange('password')}
                            value={values.password}
                            onBlur={handleBlur('password')}
                        />

                        <br></br>

                        <p className="warning">
                            {errors.password &&
                                touched.password &&
                                errors.password}
                        </p>

                        <br></br>

                        <input
                            className="inputFields"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            onBlur={handleBlur('confirmPassword')}
                        />

                        <br></br>

                        <p className="warning">
                            {errors.confirmPassword &&
                                touched.confirmPassword &&
                                errors.confirmPassword}
                        </p>

                        <br></br>

                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                size="small"
                                onClick={handleSubmit}
                                color="primary">
                                Sign Up
                            </Button>
                        </ThemeProvider>

                        <br></br>
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
