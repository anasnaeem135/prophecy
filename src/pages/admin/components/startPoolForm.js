import React, { useState } from 'react';

import { Formik } from 'formik';

import CustomButton from 'components/button';
import { startPoolValidationSchema } from '../helpers/validationSchema';

const Form = ({ initialValues = { time: '' }, onSubmit }) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={startPoolValidationSchema}
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
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                        <input
                            // style={{}}
                            type="number"
                            placeholder="Enter time to start pool"
                            onChange={handleChange('time')}
                            value={values.time}
                            onBlur={handleBlur('time')}
                        />

                        <p>{errors.time && touched.time && errors.time}</p>

                        <CustomButton
                            size="large"
                            title="Start Pool"
                            onClick={handleSubmit}
                        />
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
