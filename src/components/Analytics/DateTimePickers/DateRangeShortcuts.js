import {
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfYesterday,
  endOfYesterday,
  subWeeks,
  subMonths,
  startOfYear,
  endOfYear,
  subYears,
} from "date-fns";

export const shortcuts = [
  {
    dateRange: [startOfDay(new Date()), endOfDay(new Date())],
    label: "Today",
  },
  {
    dateRange: [startOfYesterday(new Date()), endOfYesterday(new Date())],
    label: "Yesterday",
  },
  {
    dateRange: [startOfWeek(new Date()), endOfWeek(new Date())],
    label: "This week",
  },
  {
    dateRange: [
      startOfWeek(subWeeks(new Date(), 1)),
      endOfWeek(subWeeks(new Date(), 1)),
    ],
    label: "Previous week",
  },
  {
    dateRange: [startOfMonth(new Date()), endOfMonth(new Date())],
    label: "This month",
  },
  {
    dateRange: [
      startOfMonth(subMonths(new Date(), 1)),
      endOfMonth(subMonths(new Date(), 1)),
    ],
    label: "Previous month",
  },
  {
    dateRange: [startOfYear(new Date()), endOfYear(new Date())],
    label: "This year",
  },
  {
    dateRange: [
      startOfYear(subYears(new Date(), 1)),
      endOfYear(subYears(new Date(), 1)),
    ],
    label: "Previous year",
  },
];
