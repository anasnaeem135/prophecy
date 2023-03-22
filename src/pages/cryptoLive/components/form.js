import React, { useState } from 'react';
import { Formik } from 'formik';

import { cryptoValidationSchema } from '../helpers/validationSchema';
import CustomButton from 'components/button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { theme } from 'styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import style from '../CryptoLive.module.css';

const Form = ({
    initialValues = {
        period: '',
        amount: 0,
    },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = v => {
        console.log('Here');
        onSubmit(v);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={cryptoValidationSchema}
            onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                    handleOnClick({ ...values });

                    resetForm();
                }, 500);
            }}>
            {({ handleChange, handleSubmit, values, errors, touched }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div className={style.child}>
                            <ThemeProvider theme={theme}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" />

                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={values.period}
                                        onChange={handleChange('period')}
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value="hourly"
                                            control={<Radio />}
                                            label="Hourly"
                                        />

                                        <FormControlLabel
                                            value="weekly"
                                            control={<Radio />}
                                            label="Weekly"
                                        />

                                        <FormControlLabel
                                            value="monthly"
                                            control={<Radio />}
                                            label="Monthly"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <p className={style.warning}>
                                    {errors.period &&
                                        touched.period &&
                                        errors.period}
                                </p>

                                <input
                                    placeholder="Enter Amount"
                                    value={values.amount}
                                    className={style.inputFields}
                                    type="number"
                                    min="0"
                                    onChange={handleChange('amount')}
                                />

                                <p className={style.warning}>
                                    {errors.amount &&
                                        touched.amount &&
                                        errors.amount}
                                </p>

                                {/* <br></br> */}

                                <CustomButton
                                    title="Enter"
                                    size="large"
                                    onClick={handleSubmit}
                                />
                            </ThemeProvider>
                        </div>
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
