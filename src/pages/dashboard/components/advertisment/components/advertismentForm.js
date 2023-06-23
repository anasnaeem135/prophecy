import React, { useState } from 'react';

import { Formik } from 'formik';
import { FileUploader } from 'react-drag-drop-files';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import CustomButton from 'components/button';
import { advertismentValidationSchema } from '../helpers/validationSchema';

import style from 'pages/login/Login.module.css';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const Form = ({ initialValues = { amount: '', file: null }, onSubmit }) => {
    const [formInitialValues] = useState(initialValues);

    const handleOnClick = d => {
        onSubmit(d);
    };

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={advertismentValidationSchema}
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
                setFieldValue,
            }) => {
                const setFieldValueFile = v => {
                    setFieldValue('file', v);
                };

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
                                <FileUploader
                                    handleChange={setFieldValueFile}
                                    name="file"
                                    types={fileTypes}
                                />

                                <p className={style.warning}>
                                    {errors.file && touched.file && errors.file}
                                </p>

                                <br></br>

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
                            size="large"
                            title="Upload"
                            icon={<FileUploadIcon />}
                            onClick={handleSubmit}
                        />
                    </div>
                );
            }}
        </Formik>
    );
};

export default Form;
