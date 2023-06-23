import axios from 'axios';

export async function getAdvertisments() {
    const response = await axios
        .get('http://localhost:8080/getAdvertisments')
        .then(function (response) {
            return response;
        })
        .catch(function (err) {
            return err;
        });

    return response;
}
