import React, { useState } from 'react';

import { Formik } from 'formik';
import { signupValidationSchema } from '../helpers/validationSchema';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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
                setFieldValue,
                values,
                errors,
                touched,
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <label>Enter First Name</label>

                        <br></br>

                        <input
                            className="inputFields"
                            type="name"
                            placeholder="Enter your first name"
                            onChange={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />

                        <br></br>

                        {errors.firstName &&
                            touched.firstName &&
                            errors.firstName}

                        <br></br>

                        <label>Enter Last Name</label>

                        <br></br>

                        <input
                            className="inputFields"
                            type="name"
                            placeholder="Enter your last name"
                            onChange={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />

                        <br></br>

                        {errors.lastName && touched.lastName && errors.lastName}

                        <br></br>

                        <label>Enter email</label>

                        <br></br>

                        <input
                            className="inputFields"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />

                        <br></br>

                        {errors.email && touched.email && errors.email}

                        <br></br>

                        <label>Enter Password</label>

                        <br></br>

                        <input
                            className="inputFields"
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange('password')}
                            value={values.password}
                            onBlur={handleBlur('password')}
                        />

                        <br></br>

                        {errors.password && touched.password && errors.password}

                        <br></br>

                        <label>Enter Password Again</label>

                        <br></br>

                        <input
                            className="inputFields"
                            type="password"
                            placeholder="Enter your password again"
                            onChange={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            onBlur={handleBlur('confirmPassword')}
                        />

                        <br></br>

                        {errors.confirmPassword &&
                            touched.confirmPassword &&
                            errors.confirmPassword}

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
