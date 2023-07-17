import axios from 'axios';
import { toast } from 'react-toastify';

export async function footBallApi() {
    const response = await axios
        .get('http://localhost:8080/football')
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            toast.error(err?.message, { hideProgressBar: true });
            return err;
        });

    return response;
}
