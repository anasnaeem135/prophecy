import React, { useState } from 'react';

import { Formik } from 'formik';

import CustomButton from 'components/button';
import { endPoolValidationSchema } from '../helpers/validationSchema';

const Form = ({
    initialValues = { currentPrice: '', orignalPrice: '' },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={endPoolValidationSchema}
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
                            placeholder="Enter current price"
                            onChange={handleChange('currentPrice')}
                            value={values.currentPrice}
                            onBlur={handleBlur('currentPrice')}
                        />

                        <p>
                            {errors.currentPrice &&
                                touched.currentPrice &&
                                errors.currentPrice}
                        </p>

                        <input
                            // style={{}}
                            type="number"
                            placeholder="Enter orignal price"
                            onChange={handleChange('orignalPrice')}
                            value={values.orignalPrice}
                            onBlur={handleBlur('orignalPrice')}
                        />

                        <p>
                            {errors.orignalPrice &&
                                touched.orignalPrice &&
                                errors.orignalPrice}
                        </p>

                        <br></br>

                        <CustomButton
                            title="End Pool"
                            onClick={handleSubmit}
                            size="large"
                        />
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
