import axios from 'axios';

import { toast } from 'react-toastify';

export const loginApi = async data => {
    const response = await axios
        .post('http://localhost:8080/login', {
            email: data.email,
            password: data.password,
        })
        .then(function (response) {
            toast.success(response?.data?.message, { hideProgressBar: true });
            return response;
        })
        .catch(function (err) {
            toast.error(err?.message, { hideProgressBar: true });
            return err;
        });

    return response;
};
