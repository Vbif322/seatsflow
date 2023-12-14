import { Box, Typography } from "@mui/material";
import React from "react";
import { AddTemplate } from "../components/AddTemplate";

const AddBooking = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" marginBottom={4}>
        Добавление бронирования
      </Typography>
      <AddTemplate />
    </Box>
  );
};

export default AddBooking;
