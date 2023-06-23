import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadAdvertisment = async value => {
    let formData = new FormData();
    formData.append('file', value.file);
    const response = await axios
        .post('http://localhost:8080/uploadAdvertisment', formData)
        .then(function (response) {
            toast.success(response?.data?.message, {
                hideProgressBar: true,
            });
            return response;
        })
        .catch(function (err) {
            toast.error(err?.message, { hideProgressBar: true });
            return err;
        });

    return response;
};
