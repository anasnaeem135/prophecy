import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { loginValidationSchema } from '../helpers/validationSchema';
import { ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';

import FormControlLabel from '@mui/material/FormControlLabel';
import CustomButton from 'components/button';
import { theme } from 'styles/theme';

import style from '../Login.module.css';

const Form = ({
    initialValues = { email: '', password: '', remember: false },
    onSubmit,
}) => {
    useEffect(() => {
        const enterKeyListener = event => {
            if (event.key === 'Enter') {
                console.log('Enter pressed');
            }
        };

        document.addEventListener('keydown', enterKeyListener);

        return () => {
            document.removeEventListener('keydown', enterKeyListener);
        };
    }, []);

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
                        <input
                            className={style.inputFields}
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.email && touched.email && errors.email}
                        </p>

                        <br></br>

                        <input
                            className={style.inputFields}
                            type="password"
                            placeholder="Enter your password"
                            onChange={handleChange('password')}
                            value={values.password}
                            onBlur={handleBlur('password')}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.password &&
                                touched.password &&
                                errors.password}
                        </p>

                        <br></br>

                        <CustomButton
                            size="medium"
                            title="Login"
                            icon={<SendIcon />}
                            onClick={handleSubmit}
                        />

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

                        <br></br>

                        <Link style={{ color: 'black' }} to="signup">
                            Don't have an account? Sign Up
                        </Link>
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
