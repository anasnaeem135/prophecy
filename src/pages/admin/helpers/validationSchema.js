import * as yup from 'yup';

export const startPoolValidationSchema = yup.object().shape({
    time: yup.number().min(1).required('Enter time in seconds'),
});

export const endPoolValidationSchema = yup.object().shape({
    currentPrice: yup.number().required('Enter Current Price'),
    orignalPrice: yup.number().required('Enter Orignal Price'),
});
