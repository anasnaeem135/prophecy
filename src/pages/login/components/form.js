import React, { useState } from 'react';

import { Formik } from 'formik';
import { loginValidationSchema } from '../helpers/validationSchema';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from 'styles/theme';

import '../Login.css';

const Form = ({
    initialValues = { email: '', password: '', remember: false },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={loginValidationSchema}
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
                const handleChangeRemeber = () => {
                    setFieldValue('remember', !values.remember);
                };

                return (
                    <form onSubmit={handleSubmit}>
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

                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                size="small"
                                onClick={handleSubmit}
                                color="primary">
                                Login
                            </Button>
                        </ThemeProvider>

                        <br></br>

                        <ThemeProvider theme={theme}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={values.remember}
                                        onChange={handleChangeRemeber}
                                    />
                                }
                                label="Remeber Me"
                            />
                        </ThemeProvider>
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
