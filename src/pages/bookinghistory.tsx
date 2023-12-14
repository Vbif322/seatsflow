import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { BookingTable } from "../components/BookingTable";
import {
  useGetBookingsQuery,
  useGetOldBookingsQuery,
} from "../storage/api/bookingsApi";
import { useSelector } from "react-redux";

const BookingHistory = () => {
  const { chosenRest } = useSelector((state: any) => state.token);
  const { data, error, isLoading } = useGetBookingsQuery(
    {
      restaurant_id: chosenRest?.restaurant_id,
    },
    { skip: !chosenRest.restaurant_id }
  );
  const OldBookings = useGetOldBookingsQuery(
    {
      rest_id: chosenRest.restaurant_id,
      limit: 10,
    },
    { skip: !chosenRest?.restaurant_id }
  );
  if (error) {
    console.log(error);
    return <p>Ошибка</p>;
  }

  if (!chosenRest?.restaurant_id) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h2">
          Здесь будут ваши предстоящие и прошедшие бронирования
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Бронирования</Typography>
      {isLoading ? (
        <Box
          sx={{
            height: "50vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <BookingTable bookings={data?.futureBookings} edditable />
      )}
      <Typography variant="h4">История бронирования</Typography>
      {!OldBookings.isLoading && (
        <BookingTable bookings={OldBookings.data?.oldBookings} />
      )}
    </Box>
  );
};

export default BookingHistory;
