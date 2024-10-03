// formatDate.test.ts

import { describe, expect, it } from "vitest";
import {
  convertDateToUTC,
  createHourRange,
  formatDate,
  getFormattedTime,
} from "../date.helper";

describe("formatDate", () => {
  it('should format the date in the format "Month Day, Year"', () => {
    const date = "2023-04-21";
    const formattedDate = formatDate(date);

    expect(formattedDate).toBe("April 21, 2023");
  });

  it("should handle invalid date strings", () => {
    const formattedDate = formatDate("invalid-date");

    expect(formattedDate).toBe("invalid-date");
  });
});

describe("convertDateToUTC", () => {
  it("should convert a date to the correct UTC equivalent", () => {
    const date = new Date("2023-04-21T12:00:00Z");
    const utcDate = convertDateToUTC(date);

    expect(utcDate.getUTCFullYear()).toBe(2023);
    expect(utcDate.getUTCMonth()).toBe(3); // April is month 3 (0-indexed)
    expect(utcDate.getUTCDate()).toBe(21);
    expect(utcDate.getUTCHours()).toBe(16); // Adjusted for UTC time zone
  });
});

describe("getFormattedTime", () => {
  it('should format the time as "12AM" for midnight', () => {
    const date = new Date("2023-04-21T00:00:00"); // Midnight
    const formattedTime = getFormattedTime(date);

    expect(formattedTime).toBe("12AM");
  });

  it('should format the time as "12PM" for noon', () => {
    const date = new Date("2023-04-21T12:00:00"); // Noon
    const formattedTime = getFormattedTime(date);

    expect(formattedTime).toBe("12PM");
  });

  it('should format the time as "3PM" for 3:00 PM', () => {
    const date = new Date("2023-04-21T15:00:00"); // 3 PM
    const formattedTime = getFormattedTime(date);

    expect(formattedTime).toBe("3PM");
  });
});

describe("createHourRange", () => {
  it("should create a range of formatted hours between the start and end time", () => {
    const hourRange = createHourRange(8, 10);

    expect(hourRange).toEqual([
      { text: "8AM", value: 8 },
      { text: "9AM", value: 9 },
      { text: "10AM", value: 10 },
    ]);
  });

  it("should handle cases where the start time is greater than the end time (empty range)", () => {
    const hourRange = createHourRange(10, 8);

    expect(hourRange).toEqual([]); // No range possible
  });
});
