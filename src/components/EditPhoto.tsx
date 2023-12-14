import React from "react";
import { Box, Button, TextField } from "@mui/material";

const EditPhoto = () => {
  return (
    <>
      <TextField fullWidth variant="standard" type="file" />
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

export default EditPhoto;
