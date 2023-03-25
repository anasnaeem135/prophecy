import * as yup from 'yup';

export const sportsValidationSchema = yup.object().shape({
    team: yup.string().required('PLease select a team/player'),
});
