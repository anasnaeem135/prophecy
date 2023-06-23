import * as yup from 'yup';

export const cricketPoolValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .required('Specify a amount greater than 0 to enter the pool'),
    team: yup.string().required('Select a team'),
});
