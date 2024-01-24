import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MUITextField from "./MUITextField";
import { profile } from "@/utils/types";

type Props = { handleForm: (data: profile) => void; profileData: {} | profile };

const ProfileForm = ({ handleForm, profileData }: Props) => {
  const methods = useForm({
    defaultValues: {
      booking_time: "",
      cleaning_time: "",
      hold_time: "",
      name: "",
      waiting_time: "",
    },
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (Object?.keys(profileData).length) {
      for (const field in profileData) {
        if (
          field === "booking_time" ||
          field === "cleaning_time" ||
          field === "hold_time" ||
          field === "name" ||
          field === "waiting_time"
        ) {
          setValue(field, profileData[field]);
        }
      }
    }
  }, [profileData]);

  const rules = { required: true, min: 0 };

  return (
    <form onSubmit={handleSubmit((data) => handleForm(data))}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 2,
          p: 1,
        }}
      >
        <FormProvider {...methods}>
          <MUITextField
            label="Имя профиля"
            name="name"
            rules={{ required: true }}
          />
          <MUITextField
            label="Время бронирования"
            name="booking_time"
            rules={rules}
            type="number"
          />
          <MUITextField
            label="Время уборки"
            name="cleaning_time"
            rules={rules}
            type="number"
          />
          <MUITextField
            label="Время удержания"
            name="hold_time"
            rules={rules}
            type="number"
          />
          <MUITextField
            label="Время ожидания"
            name="waiting_time"
            rules={rules}
            type="number"
          />
          <Button type="submit" variant="contained" color="secondary">
            Сохранить
          </Button>
        </FormProvider>
      </Box>
    </form>
  );
};

export default ProfileForm;
