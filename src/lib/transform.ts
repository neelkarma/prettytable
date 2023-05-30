import type { APIResponse } from "./server/types";
import type { TaggedUnion } from "./utils";

type Segment = TaggedUnion<
  "kind",
  {
    free: {
      period: number;
    };
    period: {
      period: number;
      name: string;
      room?: string;
    };
    rollcall: {};
    break: {};
  }
>;

export const transformAPIResponse = (data: APIResponse) => {
  const days: Segment[][][] = [[], [], []];

  Object.entries(data.days).forEach(([numStr, day]) => {
    const num = Number(numStr);

    // Calculating which week to insert into
    let i = null;
    if (num / 5 <= 1) i = 0;
    else if (num / 5 <= 2) i = 1;
    else i = 2;

    days[i].push(
      day.routine
        .split(",")
        // Filter out any duplicate breaks
        .filter((key) => !["MTL2", "WFL2"].includes(key))
        .map((key) => {
          if (!isNaN(Number(key))) {
            // Period

            // Check for free periods
            if (!(key in day.periods)) {
              return { kind: "free", period: Number(key) };
            }

            const periodData = day.periods[key];
            return {
              kind: "period",
              period: Number(key),
              name: periodData.title.split(" ")[0],
              room: periodData.room,
            };
          } else if (key == "RC") {
            // Rollcall
            return {
              kind: "rollcall",
            };
          } else {
            // Break
            return {
              kind: "break",
            };
          }
        })
    );
  });

  return days;
};

export const getHumanDay = (weekNum: number, dayNum: number) => {
  let week = ["A", "B", "C"][weekNum];
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri"][dayNum];
  return `${day} ${week}`;
};
