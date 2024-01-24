import React from "react";
import { time_table } from "../Forms/TimeTableForm/types";
import { parseTimeTable } from "@/utils/functions";
import { Typography } from "@mui/material";

const TimeTable = ({ time_table }: { time_table: time_table }) => {
  return (
    <>
      {parseTimeTable(time_table).map((objectDay, i) => {
        return (
          <Typography key={i}>{`${Object.keys(objectDay)[0]} ${
            objectDay[Object.keys(objectDay)[0]][0]
          }-${objectDay[Object.keys(objectDay)[0]][1]}`}</Typography>
        );
      })}
    </>
  );
};

export default TimeTable;
