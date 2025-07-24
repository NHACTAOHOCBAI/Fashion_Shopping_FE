import dayjs from 'dayjs';

export const formatDate = (dateInput: string | Date): string => {
    return dayjs(dateInput).format('MMM DD, YYYY, HH:mm');
};
