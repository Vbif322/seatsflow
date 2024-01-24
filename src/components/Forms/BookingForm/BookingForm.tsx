import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";
import "dayjs/locale/ru";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { findID } from "../../../utils/functions";
import { useSelector } from "@/storage/store";
import { booking, hall, order, table } from "@/utils/types";
import SelectMUI from "../SelectMUI";

const sxStyle = { width: "250px" };

const names = ["1", "2", "3"];

export const BookingForm = ({
  editBooking = null,
  submitFunc,
  data,
}: {
  editBooking?: booking;
  submitFunc: any;
  data?: order | object;
}) => {
  const [hall, setHall] = useState(null);
  const [table, setTable] = useState(null);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setValue("time", dayjs());
  //     console.log(1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

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
    if (data) {
      if (Object.keys(data).length !== 0) {
        if ("start_time" in data) {
          setValue("date", dayjs(data.start_time));
          setValue("time", dayjs(data.start_time));
        }
        Object.keys(data).map((key) => {
          setValue(key, data[key]);
          return key;
        });
      }
    }
  }, [data]);

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

  const watchInstant = watch("instant");

  const tablesTest = hall
    ? findID(chosenRest.halls, hall)?.tables.filter((table: table) => {
        return table.capacity > watchVisitorAmount;
      })
    : ["Необходимо выбрать зал"];

  return (
    <form onSubmit={handleSubmit(submitFunc)}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "1000px",
          gap: 1,
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
                sx={sxStyle}
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
                sx={sxStyle}
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
          sx={sxStyle}
          {...register("visitor_name", { required: !watchInstant })}
        />
        <TextField
          label="Количество гостей"
          name="visitor_amount"
          autoComplete="off"
          {...register("visitor_amount", { required: true })}
          sx={sxStyle}
        />
        <TextField
          name="visitor_phone"
          label="Телефон"
          type="tel"
          autoComplete="off"
          {...register("visitor_phone", { required: !watchInstant })}
          sx={sxStyle}
        />
        <TextField
          label="Комментарий"
          name="visitor_comment"
          autoComplete="off"
          {...register("visitor_comment")}
          sx={sxStyle}
        />
        <Autocomplete
          value={hall}
          onChange={hallHandler}
          disablePortal
          id="hall"
          options={
            Object.values(chosenRest).length
              ? chosenRest?.halls?.map((hall: hall) => hall.name)
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
          sx={sxStyle}
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
                  ?.tables.filter((table: table) => {
                    return table.capacity > watchVisitorAmount;
                  })
                  .map((table: table) => table.name)
              : ["Необходимо сначала выбрать зал"]
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Номер стола"
              {...register("table_name", { required: true })}
            />
          )}
          sx={sxStyle}
        />
        <SelectMUI control={control} label="Номер стола тест" sxStyle={sxStyle}>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </SelectMUI>
        <Controller
          name="instant"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormGroup sx={sxStyle}>
              <FormControlLabel
                control={<Checkbox {...field} defaultChecked={false} />}
                label="Мгновенное бронирование"
              />
            </FormGroup>
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
            ...sxStyle,
          }}
        >
          {editBooking?.booking_id ? "Сохранить" : "Забронировать"}
        </Button>
      </Box>
    </form>
  );
};
