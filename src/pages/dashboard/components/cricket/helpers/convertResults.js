export const convertCricketFixture = arr => {
    try {
        let retArr = [];
        arr?.map(item => {
            let obj = {
                venue: item?.venue,
                date: item?.date,
                title: item?.match_title,
                home: item?.home?.name,
                away: item?.away?.name,
            };
            retArr.push(obj);
        });

        return retArr;
    } catch (e) {
        throw e;
    }
};
