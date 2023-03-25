import React, { useState } from 'react';
import { Formik } from 'formik';

import { sportsValidationSchema } from '../helpers/validationSchema';
import CustomButton from 'components/button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { theme } from 'styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import style from '../SportsLive.module.css';

const Form = ({
    initialValues = {
        team: '',
    },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = v => {
        onSubmit(v);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={sportsValidationSchema}
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
                                    <FormLabel id="sports-live-radio-group" />

                                    <RadioGroup
                                        aria-labelledby="sports-live-radio-group"
                                        value={values.team}
                                        onChange={handleChange('team')}
                                        name="radio-buttons-group">
                                        <FormControlLabel
                                            value="Team A"
                                            control={<Radio />}
                                            label="Team A"
                                        />

                                        <FormControlLabel
                                            value="Team B"
                                            control={<Radio />}
                                            label="Team B"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <p className={style.warning}>
                                    {errors.team && touched.team && errors.team}
                                </p>

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
