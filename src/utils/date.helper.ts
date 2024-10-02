import type { DateHourRange } from "../models/Date";

/**
 * Formats a date string into a more readable format (e.g., 'April 21, 2023').
 *
 * @param date - The date string to be formatted (should be in a format recognized by JavaScript's Date object).
 *
 * @returns A formatted date string in the format 'Month Day, Year'.
 */
export const formatDate = (date: string): string => {
  const dt = new Date(date + " ");
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();
};

/**
 * Converts a given date object to a UTC date, adjusting for the UTC time zone.
 *
 * @param date - The date object to be converted to UTC.
 *
 * @returns A new Date object that represents the original date in the UTC time zone.
 */
export const convertDateToUTC = (date: Date): Date => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

/**
 * Formats a given date object to a 12-hour time format (AM/PM).
 *
 * @param date - The date object from which to extract and format the time.
 *
 * @returns A string representing the time in 12-hour format with AM or PM suffix.
 */
export const getFormattedTime = (date: Date): string => {
  let hours = date.getHours();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}${ampm}`;
};

/**
 * Creates a range of hours between a start time and end time, each formatted in 12-hour time (AM/PM).
 *
 * @param startTime - The starting hour (in 24-hour format) for the range.
 * @param endTime - The ending hour (in 24-hour format) for the range.
 *
 * @returns An array of objects representing the hour range, with each object containing:
 *  - `text`: The formatted hour in 12-hour AM/PM format.
 *  - `value`: The hour value in 24-hour format.
 */
export const createHourRange = (
  startTime: number,
  endTime: number
): DateHourRange[] => {
  const hourRange = [];

  for (let hour = startTime; hour <= endTime; hour++) {
    const date = new Date(hour);
    date.setHours(hour);
    const text = getFormattedTime(date);
    hourRange.push({ text, value: hour });
  }

  return hourRange;
};
