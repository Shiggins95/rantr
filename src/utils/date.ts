import {
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
	differenceInMonths,
	differenceInYears,
} from 'date-fns';

export const getTimestamp = (date: Date) => {
	const now = new Date();
	const minutesDiff = differenceInMinutes(now, date);
	if (minutesDiff < 60) return `${minutesDiff} m`;
	const hoursDiff = differenceInHours(now, date);
	if (hoursDiff < 24) return `${hoursDiff} h`;
	const daysDiff = differenceInDays(now, date);
	if (daysDiff < 30) return `${daysDiff} d`;
	const monthsDiff = differenceInMonths(now, date);
	if (monthsDiff < 12) return `${monthsDiff} M`;
	return `${differenceInYears(now, date)} y`;
};
