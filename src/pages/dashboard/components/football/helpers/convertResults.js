import { convertDate } from 'helpers/convertDate';

export const convertFootballFixture = arr => {
    try {
        let retArr = [];
        arr?.map(item => {
            let obj = {
                venue: item?.fixture?.venue?.name,
                date: convertDate(item?.fixture?.date),
                title: `${item?.teams?.home?.name} VS ${item?.teams?.away?.name}`,
                home: item?.teams?.home?.name,
                away: item?.teams?.away?.name,
            };
            retArr.push(obj);
        });

        return retArr;
    } catch (e) {
        throw e;
    }
};
