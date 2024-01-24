import { Box, Typography } from "@mui/material";
import React from "react";
import { AddTemplate } from "../components/AddTemplate";
import { BookingForm } from "@/components/Forms/BookingForm/BookingForm";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils/helpers";
import { findID } from "@/utils/functions";
import dayjs from "dayjs";
import { useAddBookingMutation } from "@/storage/api/bookingsApi";
import { useSelector } from "@/storage/store";
import { setAlerts } from "@/storage/alertSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const AddBooking = () => {
  const [addBookingData] = useAddBookingMutation();
  const { chosenRest } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const router = useRouter();
  const addBookingHandler = async (data) => {
    console.log(data);
    let fullDate = dayjs(
      `${data.date.format("YYYY-MM-DDT")}${data.time.format("HH:mm:ssZ")}`
    );
    if (data.hall_name && data.table_name) {
      let hallObject = findID(chosenRest.halls, data.hall_name);
      try {
        await addBookingData({
          restaurant_id: chosenRest.restaurant_id,
          hall_id: hallObject.hall_id,
          table_ids: [findID(hallObject.tables, data.table_name).table_id],
          visitor_name: data.visitor_name ? data.visitor_name : "Гость",
          visitors_amount: data.visitor_amount,
          start_time: fullDate.format(),
          end_time: fullDate.add(2, "h").format(),
          visitor_phone: data.visitor_phone ? data.visitor_phone : "+7",
          visitor_comment: data.visitor_comment,
          order_id: router?.query?.order_id ? router.query.order_id : false,
        })
          .unwrap()
          .then(() =>
            dispatch(
              setAlerts({ type: "success", text: "Бронирование добавлено" })
            )
          );
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errMsg = "error" in err ? err.error : JSON.stringify(err.data);
          console.warn(errMsg);
        } else if (isErrorWithMessage(err)) {
          console.warn(err);
        }
      }
    } else console.log(123);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" marginBottom={4}>
        Добавление бронирования
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <BookingForm submitFunc={addBookingHandler} data={router.query} />
        <AddTemplate />
      </Box>
    </Box>
  );
};

export default AddBooking;
