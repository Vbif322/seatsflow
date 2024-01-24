import { time_table } from "@/components/Forms/TimeTableForm/types";

export const colorChange = (i) => {
  switch (i % 3) {
    case 0:
      return "first";
    case 1:
      return "second";
    default:
      return "third";
  }
};

export const findID = (Array, value) => {
  return Array.find((item) => item.name === value);
};

export const workTime = (
  openStr: string,
  closeStr: string
): [string, string] => {
  const parseOpen = openStr.split(":");
  const parseClose = closeStr.split(":");
  const open = Number(
    parseOpen.length > 1
      ? Number(parseOpen[0]) * 60 + Number(parseOpen[1])
      : Number(parseOpen) * 60
  );
  const close = Number(
    parseClose.length > 1
      ? Number(parseClose[0]) * 60 + Number(parseClose[1])
      : Number(parseClose) * 60
  );
  if (open >= close) {
    return [openStr, 1440 - open + close + ""];
  } else {
    return [openStr, close - open + ""];
  }
};

export const parseNumber = (str: string) => {
  const regexp = str.match(/\d+/g);
  if (regexp === null) {
    return "";
  } else {
    if (regexp.join("").length < 3) {
      if (Number(regexp.join("")) > 23) {
        return "23";
      } else return regexp.join("");
    } else if (regexp.join("").length === 3) {
      return regexp.join("").slice(0, 2) + ":" + regexp.join("")[2];
    } else if (regexp.join("").length === 4) {
      if (Number(regexp.join("").slice(2, 4)) > 59) {
        return regexp.join("").slice(0, 2) + ":" + "59";
      } else
        return regexp.join("").slice(0, 2) + ":" + regexp.join("").slice(2, 4);
    } else if (regexp.join("").length === 5) {
      if (
        Number(regexp.join("").slice(0, 2)) > 23 &&
        Number(regexp.join("").slice(2, 4)) > 59
      ) {
        return "23" + ":" + "59";
      } else if (
        Number(regexp.join("").slice(0, 2)) > 23 &&
        Number(regexp.join("").slice(2, 4)) < 59
      ) {
        return "23" + ":" + regexp.join("").slice(2, 4);
      } else if (
        Number(regexp.join("").slice(0, 2)) < 23 &&
        Number(regexp.join("").slice(2, 4)) > 59
      ) {
        return regexp.join("").slice(0, 2) + ":" + "59";
      } else
        return regexp.join("").slice(0, 2) + ":" + regexp.join("").slice(2, 4);
    }
  }
};

export const parseTimeTable = (time_table: time_table) => {
  let order = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 7,
  };
  let res = Object.keys(time_table)
    .sort((x, y) => order[x] - order[y])
    .map((day) => ({ [day]: time_table[day] }));

  res = res.map((objectDay) => {
    let key = Object.keys(objectDay)[0];
    if (Number(objectDay[key][0].slice(0, 2)) + objectDay[key][1] / 60 > 24) {
      return {
        [key]: [
          objectDay[key][0],
          `0${
            Number(objectDay[key][0].slice(0, 2)) + objectDay[key][1] / 60 - 24
          }:${objectDay[key][1] % 60}0`,
        ],
      };
    } else {
      return {
        [key]: [
          objectDay[key][0],
          `${Number(objectDay[key][0].slice(0, 2)) + objectDay[key][1] / 60}:${
            objectDay[key][1] % 60
          }0`,
        ],
      };
    }
  });
  res = res.map((objectDay) => {
    let key = Object.keys(objectDay)[0];
    switch (key) {
      case "Mon":
        return { Пн: objectDay[key] };
      case "Tue":
        return { Вт: objectDay[key] };
      case "Wed":
        return { Ср: objectDay[key] };
      case "Thu":
        return { Чт: objectDay[key] };
      case "Fri":
        return { Пт: objectDay[key] };
      case "Sat":
        return { Сб: objectDay[key] };
      default:
        return { Вс: objectDay[key] };
    }
  });
  return res;
};
