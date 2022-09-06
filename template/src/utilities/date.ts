import { MonthName, WeekDayName } from "../ts/objects";
import moment from "moment";

export const weekDayNames = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
] as WeekDayName[];

export const MonthNames = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
] as MonthName[];

export const convertDateTimeToTime = (datetime: string | Date) => {
	if (!datetime) return "-";

	const date = new Date(datetime);
	return `${("0" + date.getHours()).substr(-2)}:${("0" + date.getMinutes()).substr(-2)}`;
};

export const convertDateTimeToDate = (datetime?: string | Date, short: boolean = false) => {
	if (!datetime) return "-";

	const date = new Date(datetime);
	const mDate = moment(date);

	return short
		? mDate.format("MMM DD")
		: `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).substr(-2)}-${("0" + date.getDate()).substr(-2)}`;
};

export const convertDateTimeToLongDateString = (datetime: Date | string, short: boolean = false, hasYear = true) => {
	if (!datetime) return "-";

	const date = moment(new Date(datetime));
	return date.format("dddd, MMMM DD");
};

export const getTimeDiffString = (time: string | Date) => {
	const date = new Date(time);
	const now = new Date();
	const secondsDiff = (new Date().getTime() - date.getTime()) / 1000;
	const mDate = moment(date);
	const mNow = moment(now);
	const isBefore = mDate.isBefore(mNow);

	if (isBefore) {
		if (secondsDiff < 60) {
			return "Few seconds ago";
		} else if (secondsDiff < 60 * 60) {
			return `${Math.ceil(secondsDiff / 60.0)} min ago`;
		} else if (secondsDiff < 24 * 60 * 60) {
			return `${Math.ceil(secondsDiff / (60 * 60.0))} hour ago`;
		} else if (secondsDiff < 2 * 24 * 60 * 60) {
			return "Yesterday";
		} else {
			return mDate.format("MMM DD");
		}
	} else {
		return "Future";
	}
};
