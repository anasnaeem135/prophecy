import * as yup from 'yup';

export const advertismentValidationSchema = yup.object().shape({
    amount: yup
        .number()
        .test(
            'valueEquals2',
            'Value is less than or greater than 2.',
            function () {
                const { amount } = this.parent;
                if (amount !== 2) {
                    return false;
                }
                return true;
            },
        )
        .required('Need PRC Tokens'),
    file: yup.mixed().required('Picture is required'),
});
