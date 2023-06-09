import React, { useState } from 'react';

import { Formik } from 'formik';
import SendIcon from '@mui/icons-material/Send';

import style from '../Signup.module.css';
import { signupValidationSchema } from '../helpers/validationSchema';
import CustomButton from 'components/button';

const Form = ({
    initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
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

                        <small className={style.warning}>
                            {errors.firstName &&
                                touched.firstName &&
                                errors.firstName}
                        </small>

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

                        <small className={style.warning}>
                            {errors.lastName &&
                                touched.lastName &&
                                errors.lastName}
                        </small>

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

                        <small className={style.warning}>
                            {errors.email && touched.email && errors.email}
                        </small>

                        <br></br>

                        <input
                            className={style.inputFields}
                            type="number"
                            placeholder="Phone Number"
                            onChange={handleChange('phoneNo')}
                            onBlur={handleBlur('phoneNo')}
                            value={values.phoneNo}
                        />

                        <br></br>

                        <small className={style.warning}>
                            {errors.phoneNo &&
                                touched.phoneNo &&
                                errors.phoneNo}
                        </small>

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

                        <small className={style.warning}>
                            {errors.password &&
                                touched.password &&
                                errors.password}
                        </small>

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

                        <small className={style.warning}>
                            {errors.confirmPassword &&
                                touched.confirmPassword &&
                                errors.confirmPassword}
                        </small>

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
