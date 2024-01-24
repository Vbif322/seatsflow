import { Box, Button, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import "dayjs/locale/ru";
import React, { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { booking } from "@/utils/types";

type Props = { editBooking?: booking; submitFunc: any };

const OrderForm = ({ editBooking = null, submitFunc }: Props) => {
  const { register, control, setValue, handleSubmit } = useForm();

  useEffect(() => {
    if (editBooking) {
      setValue("date", dayjs(editBooking.start_time));
      setValue("time", dayjs(editBooking.start_time));
      Object.keys(editBooking).map((key) => {
        setValue(key, editBooking[key]);
        return key;
      });
    }
  }, [editBooking, setValue]);

  return (
    <form onSubmit={handleSubmit(submitFunc)}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          minWidth: "600px",
          maxWidth: "1000px",
          gap: 2,
        }}
      >
        <Controller
          name="date"
          defaultValue={dayjs()}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <DatePicker
                label="Дата"
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
              />
            </LocalizationProvider>
          )}
        />
        <Controller
          name="time"
          defaultValue={dayjs()}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
              <TimePicker
                label="Время"
                value={value}
                onChange={(event) => {
                  onChange(event);
                }}
                viewRenderers={{
                  hours: renderTimeViewClock,
                  minutes: renderTimeViewClock,
                }}
              />
            </LocalizationProvider>
          )}
        />
        <TextField
          label="Имя"
          name="visitor_name"
          autoComplete="off"
          {...register("visitor_name", { required: true })}
        />
        <TextField
          label="Количество гостей"
          name="visitor_amount"
          autoComplete="off"
          {...register("visitor_amount", { required: true })}
        />
        <TextField
          name="visitor_phone"
          label="Телефон"
          type="tel"
          autoComplete="off"
          {...register("visitor_phone", { required: true })}
        />
        <TextField
          label="Комментарий"
          name="visitor_comment"
          autoComplete="off"
          {...register("visitor_comment")}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          sx={{
            minWidth: "125px",
            height: "40px",
            alignSelf: "center",
          }}
        >
          {editBooking?.booking_id ? "Сохранить" : "Создать заявку"}
        </Button>
      </Box>
    </form>
  );
};

export default OrderForm;
