import { Box, Typography } from "@mui/material";
import React from "react";

export const RestaurantCard = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "25px" }}>{title}</Typography>
      <Box
        sx={{
          width: "288px",
          height: "467px",
          bgcolor: "#F2F2F2",
          borderRadius: "50px",
        }}
      ></Box>
    </Box>
  );
};
