import * as yup from 'yup';

export const transferValidationSchema = yup.object().shape({
    recieverAdd: yup.string().required('Account address is required'),
    amount: yup.number().required('Specify the amount you want to send'),
});

export const cryptoPoolValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Specify a amount greater than 0 to enter the pool'),
    isLong: yup.boolean().required('Select one option'),
});

export const cricketPoolValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Specify a amount greater than 0 to enter the pool'),
    team: yup.string().required('Select a team'),
});

export const advertismentValidationSchema = yup.object().shape({
    amount: yup.number().required('Need PRC Tokens'),
    file: yup.mixed().required('Picture is required'),
    // .min(1, 'Attach at least 1 picture')
});
