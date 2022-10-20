import {MonthName, WeekDayName} from "~/types/objects";
import moment from "moment";

export const WeekDayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
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
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const convertDateTimeToDate = (datetime?: string | Date, short: boolean = false) => {
    if (!datetime) return "-";

    const date = new Date(datetime);
    const mDate = moment(date);

    return short
        ? mDate.format("MMM DD")
        : `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export const getTimeDiff = (time: Date | string) => {
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
