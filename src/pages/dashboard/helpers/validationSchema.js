import * as yup from 'yup';

export const transferValidationSchema = yup.object().shape({
    recieverAdd: yup.string().required('Account address is required'),
    amount: yup.number().required('Specify the amount you want to send'),
});
