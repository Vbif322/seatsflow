import { Box, Button } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import MUITextField from "./MUITextField";

type Props = {};

const ProfileForm = (props: Props) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 2,
        }}
      >
        <FormProvider {...methods}>
          <MUITextField label="Время бронирования" name="booking_time" />
          <MUITextField label="Время уборки" name="cleaning_time" />
          <MUITextField label="Время удержания" name="hold_time" />
          <MUITextField label="Время ожидания" name="waiting_time" />
          <Button type="submit" variant="contained" color="secondary">
            Сохранить
          </Button>
        </FormProvider>
      </Box>
    </form>
  );
};

export default ProfileForm;
