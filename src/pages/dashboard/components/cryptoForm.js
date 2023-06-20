import React, { useState } from 'react';

import { Formik } from 'formik';
import Radio from '@mui/material/Radio';
import LoginIcon from '@mui/icons-material/Login';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

import { theme } from 'styles/theme';
import CustomButton from 'components/button';
import { cryptoPoolValidationSchema } from '../helpers/validationSchema';

import style from 'pages/login/Login.module.css';

const Form = ({ initialValues = { amount: '', isLong: null }, onSubmit }) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={cryptoPoolValidationSchema}
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <ThemeProvider theme={theme}>
                                    <FormControl>
                                        <RadioGroup
                                            defaultValue="long"
                                            name="radio-buttons-group"
                                            value={values.isLong}
                                            onChange={handleChange('isLong')}>
                                            <FormControlLabel
                                                value="true"
                                                control={<Radio />}
                                                label="Long"
                                            />
                                            <FormControlLabel
                                                value="false"
                                                control={<Radio />}
                                                label="Short"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </ThemeProvider>

                                <p className={style.warning}>
                                    {errors.isLong &&
                                        touched.isLong &&
                                        errors.isLong}
                                </p>

                                <input
                                    className={style.inputFields}
                                    type="number"
                                    style={{ width: '100%' }}
                                    placeholder="Enter amount"
                                    onChange={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    value={values.amount}
                                />

                                <p className={style.warning}>
                                    {errors.amount &&
                                        touched.amount &&
                                        errors.amount}
                                </p>
                                <br></br>
                            </div>
                        </div>
                        <CustomButton
                            size="small"
                            title="Enter"
                            icon={<LoginIcon />}
                            onClick={handleSubmit}
                        />
                    </div>
                );
            }}
        </Formik>
    );
};

export default Form;
