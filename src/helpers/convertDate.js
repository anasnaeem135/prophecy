export const convertDate = inputDateString => {
    const dateObj = new Date(inputDateString);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();

    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;

    const temp = `${formattedDate} at ${formattedTime}`;
    return temp;
};
