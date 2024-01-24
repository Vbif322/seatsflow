import { Box } from "@mui/material";
import React from "react";
import { RestCard } from "./RestCard";
import { restaurant } from "@/utils/types";

export const ListRestCards = ({ restaurants, granted_restaurants }) => {
  if (restaurants.concat(granted_restaurants).length <= 3) {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        {restaurants.map((rest: restaurant, i: number) => {
          return (
            <RestCard
              key={i}
              name={rest.name}
              id={rest.restaurant_id}
              index={i}
              time_table={rest.time_table}
            />
          );
        })}
        {granted_restaurants.map((rest: restaurant, i: number) => {
          return (
            <RestCard
              key={i}
              name={rest.name}
              id={rest.restaurant_id}
              index={i}
              granted
              time_table={rest.time_table}
            />
          );
        })}
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        {restaurants.map((rest: restaurant, i: number) => {
          if (i < 3) {
            return (
              <RestCard
                key={i}
                name={rest.name}
                id={rest.restaurant_id}
                index={i}
                time_table={rest.time_table}
              />
            );
          } else return <React.Fragment key={i}></React.Fragment>;
        })}
      </Box>
    );
  }
};
