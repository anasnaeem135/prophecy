export const convertAdvertisments = arr => {
    try {
        let retArr = [];
        const str = 'http://localhost:8080';
        arr?.map(item => {
            let obj = {
                img: str.concat(item),
            };

            retArr.push(obj);
        });

        return retArr;
    } catch (e) {
        throw e;
    }
};
