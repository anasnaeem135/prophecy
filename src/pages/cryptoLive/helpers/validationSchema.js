import * as yup from 'yup';

export const cryptoValidationSchema = yup.object().shape({
    period: yup.string().required('Select a time period'),
    amount: yup
        .number()
        .min(1)
        .required('Enter an amount to be submitted for prediction'),
});
