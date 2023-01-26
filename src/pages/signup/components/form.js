import React, { useState } from 'react';

import style from '../Signup.module.css';

import { Formik } from 'formik';
import { signupValidationSchema } from '../helpers/validationSchema';
import CustomButton from 'components/button';

import SendIcon from '@mui/icons-material/Send';
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
                            className={style.inputFields}
                            type="name"
                            placeholder="First Name"
                            onChange={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.firstName &&
                                touched.firstName &&
                                errors.firstName}
                        </p>

                        <br></br>

                        <input
                            className={style.inputFields}
                            type="name"
                            placeholder="Last Name"
                            onChange={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.lastName &&
                                touched.lastName &&
                                errors.lastName}
                        </p>

                        <br></br>

                        <input
                            className={style.inputFields}
                            type="email"
                            placeholder="Email"
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
                            placeholder="Password"
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

                        <input
                            className={style.inputFields}
                            type="password"
                            placeholder="Confirm Password"
                            onChange={handleChange('confirmPassword')}
                            value={values.confirmPassword}
                            onBlur={handleBlur('confirmPassword')}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.confirmPassword &&
                                touched.confirmPassword &&
                                errors.confirmPassword}
                        </p>

                        <br></br>

                        <CustomButton
                            title="Sign up"
                            size="medium"
                            icon={<SendIcon />}
                            onClick={handleSubmit}
                        />

                        <br></br>
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
