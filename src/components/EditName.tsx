import { Box, Button, TextField } from "@mui/material";
import React from "react";

const EditName = () => {
  return (
    <>
      <TextField label="Имя" fullWidth variant="standard" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "100%",
          gap: 2,
        }}
      >
        <Button>Отмена</Button>
        <Button variant="contained">Сохранить</Button>
      </Box>
    </>
  );
};

export default EditName;
