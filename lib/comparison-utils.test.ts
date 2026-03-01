import { test, describe } from "node:test";
import assert from "node:assert";
import { formatRelativeDate } from "./comparison-utils.ts";

describe("formatRelativeDate", () => {
  const NOW = new Date("2024-03-20T12:00:00Z");

  test("should return N/A for empty or N/A input", () => {
    assert.strictEqual(formatRelativeDate(""), "N/A");
    assert.strictEqual(formatRelativeDate("N/A"), "N/A");
    // @ts-ignore
    assert.strictEqual(formatRelativeDate(null), "N/A");
  });

  test("should handle future dates or very recent dates", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    // Future date
    const future = new Date(NOW.getTime() + 1000).toISOString();
    assert.strictEqual(formatRelativeDate(future), "just now");

    // Less than a minute ago
    const recently = new Date(NOW.getTime() - 30 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(recently), "just now");

    // Exactly 1 minute ago
    const oneMinAgo = new Date(NOW.getTime() - 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(oneMinAgo), "just now");
  });

  test("should format minutes", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const twoMinsAgo = new Date(NOW.getTime() - 2 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(twoMinsAgo), "2 minutes ago");

    const fiftyNineMinsAgo = new Date(NOW.getTime() - 59 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(fiftyNineMinsAgo), "59 minutes ago");
  });

  test("should format hours", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const oneHourAgo = new Date(NOW.getTime() - 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(oneHourAgo), "an hour ago");

    const fiveHoursAgo = new Date(NOW.getTime() - 5 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(fiveHoursAgo), "5 hours ago");

    const twentyThreeHoursAgo = new Date(NOW.getTime() - 23 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(twentyThreeHoursAgo), "23 hours ago");
  });

  test("should format days", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const yesterday = new Date(NOW.getTime() - 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(yesterday), "yesterday");

    const threeDaysAgo = new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(threeDaysAgo), "3 days ago");

    const sixDaysAgo = new Date(NOW.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(sixDaysAgo), "6 days ago");
  });

  test("should format weeks", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const lastWeek = new Date(NOW.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(lastWeek), "last week");

    const twoWeeksAgo = new Date(NOW.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(twoWeeksAgo), "2 weeks ago");

    const threeWeeksAgo = new Date(NOW.getTime() - 21 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(threeWeeksAgo), "3 weeks ago");
  });

  test("should format months", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const lastMonth = new Date(NOW.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(lastMonth), "last month");

    const threeMonthsAgo = new Date(NOW.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(threeMonthsAgo), "3 months ago");

    const elevenMonthsAgo = new Date(NOW.getTime() - 330 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(elevenMonthsAgo), "11 months ago");
  });

  test("should format years", (t) => {
    t.mock.timers.enable({ apis: ["Date"] });
    t.mock.timers.setTime(NOW.getTime());

    const lastYear = new Date(NOW.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(lastYear), "last year");

    const twoYearsAgo = new Date(NOW.getTime() - 730 * 24 * 60 * 60 * 1000).toISOString();
    assert.strictEqual(formatRelativeDate(twoYearsAgo), "2 years ago");
  });
});
