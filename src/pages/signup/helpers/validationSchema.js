import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is Required'),
    password: yup.string().required('Password is required').min(6),
    confirmPassword: yup
        .string()
        .test(
            'confirmPasswordEqualsPassword',
            'Confirm Password does not match password.',
            function (confirmPassword) {
                const { password } = this.parent;
                if (confirmPassword !== password) {
                    return false;
                }
                return true;
            },
        )
        .required('Confirm password is required'),
});
