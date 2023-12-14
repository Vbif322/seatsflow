import { Box } from "@mui/material";
import React from "react";
import { RestCard } from "./RestCard";

export const ListRestCards = ({ restaurants, granted_restaurants }) => {
  if (restaurants.concat(granted_restaurants).length <= 3) {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        {restaurants.map((rest, i) => {
          return (
            <RestCard
              key={i}
              name={rest.name}
              id={rest.restaurant_id}
              index={i}
            />
          );
        })}
        {granted_restaurants.map((rest, i) => {
          return (
            <RestCard
              key={i}
              name={rest.name}
              id={rest.restaurant_id}
              index={i}
              granted
            />
          );
        })}
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        {restaurants.map((rest, i) => {
          if (i < 3) {
            return (
              <RestCard
                key={i}
                name={rest.name}
                id={rest.restaurant_id}
                index={i}
              />
            );
          } else return <React.Fragment key={i}></React.Fragment>;
        })}
      </Box>
    );
  }
};
