import React from "react";
import { Box, Button, TextField } from "@mui/material";

const EditPassword = () => {
  return (
    <>
      <TextField
        label="Новый пароль"
        fullWidth
        variant="standard"
        type="password"
        id="newPassword"
        autoComplete="off"
      />
      <TextField
        label="Подтвердите пароль"
        fullWidth
        variant="standard"
        type="password"
        id="confirmNewPassword"
        autoComplete="off"
      />
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

export default EditPassword;
