import * as yup from 'yup';

export const advertismentValidationSchema = yup.object().shape({
    amount: yup.number().required('Need PRC Tokens'),
    file: yup.mixed().required('Picture is required'),
});
