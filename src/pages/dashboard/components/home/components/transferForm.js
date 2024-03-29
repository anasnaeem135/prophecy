import React, { useState } from 'react';

import { Formik } from 'formik';
import SendIcon from '@mui/icons-material/Send';

import CustomButton from 'components/button';
import { transferValidationSchema } from '../helpers/validationSchema';

import style from 'pages/login/Login.module.css';

const Form = ({
    initialValues = { recieverAdd: '', amount: '' },
    onSubmit,
}) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={transferValidationSchema}
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
                            type="string"
                            style={{ width: '30%' }}
                            placeholder="Enter receiver account address"
                            onChange={handleChange('recieverAdd')}
                            onBlur={handleBlur('recieverAdd')}
                            value={values.recieverAdd}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.recieverAdd &&
                                touched.recieverAdd &&
                                errors.recieverAdd}
                        </p>

                        <br></br>

                        <input
                            className={style.inputFields}
                            style={{ width: '30%' }}
                            type="number"
                            placeholder="Enter amount"
                            onChange={handleChange('amount')}
                            value={values.amount}
                            onBlur={handleBlur('amount')}
                        />

                        <br></br>

                        <p className={style.warning}>
                            {errors.amount && touched.amount && errors.amount}
                        </p>

                        <br></br>

                        <CustomButton
                            size="medium"
                            title="Send"
                            icon={<SendIcon />}
                            onClick={handleSubmit}
                        />
                    </form>
                );
            }}
        </Formik>
    );
};

export default Form;
