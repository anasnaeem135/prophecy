import * as yup from 'yup';

export const cryptoPoolValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Specify a amount greater than 0 to enter the pool'),
    isLong: yup.boolean().required('Select one option'),
});
