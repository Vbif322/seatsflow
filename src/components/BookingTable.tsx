import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BookingForm } from "./Forms/BookingForm/BookingForm";
import {
  useDeleteBookingMutation,
  useEditBookingMutation,
} from "../storage/api/bookingsApi";
import { findID } from "../utils/functions";
import { useSelector } from "@/storage/store";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils/helpers";
import { booking } from "@/utils/types";

const PatchBookingDialog = ({ open, setOpen, editBooking, submitForm }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"lg"}>
      <DialogTitle>Изменение бронирования</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <BookingForm editBooking={editBooking} submitFunc={submitForm} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Назад</Button>
      </DialogActions>
    </Dialog>
  );
};

export type Booking = {
  booking_id?: "string";
  creator?: "string";
  hall_id?: "string";
  hall_name?: "string";
  start_time?: "string";
  table_id?: "string";
  table_name?: "string";
  visitor_amount?: number;
  visitor_comment?: "string";
  visitor_name?: "string";
  visitor_phone?: "string";
};

export const BookingTable = ({ bookings = [], edditable = false }) => {
  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [editBooking, setEditBooking] = useState<Booking>({});
  const [prevRow, setPrevRow] = useState<any>("");
  const [alertPatch, setAlertPatch] = useState(false);

  const [patchBooking, patchBookingState] = useEditBookingMutation();
  const [deleteBooking, deleteBookingState] = useDeleteBookingMutation();
  const { restaurants, chosenRestID } = useSelector((state) => state.token);

  const submitForm = async (data) => {
    let fullDate = dayjs(
      `${data.date.format("YYYY-MM-DDT")}${data.time.format("HH:mm:ssZ")}`
    );
    if (data.hall_name && data.table_name) {
      let hallObject = findID(restaurants[chosenRestID].halls, data.hall_name);
      try {
        await patchBooking({
          booking_id: editBooking.booking_id,
          hall_id: hallObject.hall_id,
          table_id: findID(hallObject.tables, data.table_name).table_id,
          visitor_name: data.visitor_name,
          visitors_amount: data.visitor_amount,
          start_time: fullDate.format(),
          end_time: fullDate.add(2, "h").format(),
          visitor_phone: data.visitor_phone,
          visitor_comment: data.visitor_comment,
        }).unwrap();
        setOpen(false);
        setAlertPatch(true);
        setTimeout(() => setAlertPatch(false), 5000);
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          // you can access all properties of `FetchBaseQueryError` here
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
          // enqueueSnackbar(errMsg, { variant: 'error' })
          console.warn(errMsg);
        } else if (isErrorWithMessage(err)) {
          // you can access a string 'message' property here
          // enqueueSnackbar(err.message, { variant: 'error' })
          console.warn(err);
        }
      }
    } else console.log(123);
  };

  const editRow = (e, booking) => {
    setEditBooking(booking);
    if (edditable) {
      e.stopPropagation();
      if (e.target.parentElement.bgColor) {
        e.target.parentElement.bgColor = "";
        setVisible(false);
        setPicked(false);
      } else {
        if (!picked) {
          setVisible(true);
          setPicked(true);
          setPrevRow(e.target.parentElement);
          e.target.parentElement.bgColor = "wheat";
        } else {
          e.target.parentElement.bgColor = "wheat";
          prevRow.bgColor = "";
          setPrevRow(e.target.parentElement);
          return;
        }
      }
    }
  };

  const deleteRowHandler = async () => {
    try {
      await deleteBooking({ booking_id: editBooking.booking_id }).unwrap();
      prevRow.bgColor = "";
      setVisible(false);
      setPicked(false);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
        // enqueueSnackbar(errMsg, { variant: 'error' })
        console.warn(errMsg);
      } else if (isErrorWithMessage(err)) {
        // you can access a string 'message' property here
        // enqueueSnackbar(err.message, { variant: 'error' })
        console.warn(err);
      }
    }
  };

  return (
    <Box>
      {alertPatch && (
        <Box sx={{ position: "absolute", left: 16, zIndex: 3000, bottom: 32 }}>
          <Alert severity="success" onClose={() => setAlertPatch(false)}>
            Бронирование успешно изменено
          </Alert>
        </Box>
      )}
      <PatchBookingDialog
        open={open}
        setOpen={setOpen}
        editBooking={editBooking}
        submitForm={submitForm}
      />
      <TableContainer
        sx={{ borderRadius: "10px", border: "1px solid #000", mt: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (theme) => theme.palette.secondary.main,
              }}
            >
              <TableCell>Зал</TableCell>
              <TableCell>Стол</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Количество гостей</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Комментарий</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, i) => {
              return (
                <TableRow key={i} onClick={(e) => editRow(e, booking)}>
                  <TableCell>{booking.hall_name}</TableCell>
                  <TableCell>{booking.table_name}</TableCell>
                  <TableCell>
                    {dayjs(booking.start_time).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(booking.start_time).format("HH:mm")}
                  </TableCell>
                  <TableCell>{booking.visitor_amount}</TableCell>
                  <TableCell>{booking.visitor_name}</TableCell>
                  <TableCell>{booking.visitor_phone}</TableCell>
                  <TableCell>{booking.visitor_comment}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          height: "37px",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {visible && (
            <>
              <Button
                variant="contained"
                color="error"
                onClick={deleteRowHandler}
              >
                Удалить
              </Button>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Изменить
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
