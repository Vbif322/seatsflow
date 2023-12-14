import { Autocomplete, Box, Button, TextField } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import "dayjs/locale/ru";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { findID } from "../utils/functions";
import { useSelector } from "@/storage/store";

type booking = {
  booking_id: string;
  creator: string;
  hall_id: string;
  hall_name: string;
  start_time: string;
  table_id: string;
  table_name: string;
  visitor_amount: number;
  visitor_comment: string;
  visitor_name: string;
  visitor_phone: string;
};
export const BookingForm = ({
  editBooking = null,
  submitFunc,
}: {
  editBooking?: booking;
  submitFunc: any;
}) => {
  const [hall, setHall] = useState(null);
  const [table, setTable] = useState(null);

  const {
    restaurants,
    granted_restaurants,
    chosenRest,
  }: { restaurants: any; chosenRest: any; granted_restaurants: any } =
    useSelector((state) => state.token);
  const { register, control, setValue, handleSubmit, getValues, watch } =
    useForm();

  const hallHandler = (event, newValue) => {
    setHall(newValue);
    setTable(null);
  };

  useEffect(() => {
    if (editBooking) {
      setHall(editBooking.hall_name);
      setTable(editBooking.table_name);
      setValue("date", dayjs(editBooking.start_time));
      setValue("time", dayjs(editBooking.start_time));
      Object.keys(editBooking).map((key) => {
        setValue(key, editBooking[key]);
        return key;
      });
    }
  }, [editBooking, setValue]);

  const watchVisitorAmount = watch("visitor_amount");

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
              <MobileTimePicker
                label="Время"
                value={value}
                onChange={(event) => {
                  onChange(event);
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
        <Autocomplete
          value={hall}
          onChange={hallHandler}
          disablePortal
          id="hall"
          options={
            Object.values(chosenRest).length
              ? chosenRest?.halls?.map((hall) => hall.name)
              : []
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="hall_name"
              label="Зал"
              {...register("hall_name", { required: true })}
            />
          )}
        />
        <Autocomplete
          value={table}
          onChange={(event, newValue) => {
            setTable(newValue);
          }}
          disablePortal
          id="table"
          getOptionDisabled={(option) =>
            option === "Необходимо сначала выбрать зал"
          }
          options={
            hall
              ? findID(chosenRest.halls, hall)
                  ?.tables.filter((table) => {
                    return table.capacity > 1;
                  })
                  .map((table) => table.name)
              : ["Необходимо сначала выбрать зал"]
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Номер стола"
              {...register("table_name", { required: true })}
            />
          )}
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
          {editBooking?.booking_id ? "Сохранить" : "Забронировать"}
        </Button>
      </Box>
    </form>
  );
};
