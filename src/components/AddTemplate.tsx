import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const AddTemplate = () => {
  return (
    <Box
      sx={{ width: "623px", display: "flex", flexDirection: "column", gap: 3 }}
    >
      <Typography variant="h5">Шаблон вашего заведения</Typography>
      <Box
        sx={{
          width: "623px",
          height: "472px",
          bgcolor: "#f2f2f2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="outlined">Зал 1</Button>
        <Button variant="outlined">Зал 2</Button>
        <Button variant="outlined">Летник</Button>
        <Button variant="outlined">Общий план</Button>
      </Box>
    </Box>
  );
};
