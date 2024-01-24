import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const NearestBookings = ({ bookings = [] }) => {
  const router = useRouter();

  const nearestBookigs = bookings.filter(
    (booking) => dayjs(booking.start_time).diff(dayjs(), "m") < 1440
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Typography variant="subtitle1" sx={{ whiteSpace: "nowrap" }}>
        Предстоящие бронирования на сегодня
      </Typography>
      <TableContainer sx={{ borderRadius: "10px", border: "1px solid #000" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (theme) => theme.palette.secondary.main,
              }}
            >
              <TableCell>Зал</TableCell>
              <TableCell>Стол</TableCell>
              <TableCell>Время</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nearestBookigs.map((booking, i) => {
              if (i === 4) {
                return (
                  <TableRow key={i}>
                    <TableCell>...</TableCell>
                    <TableCell>...</TableCell>
                    <TableCell>...</TableCell>
                  </TableRow>
                );
              }
              if (i > 4) return <React.Fragment key={i}></React.Fragment>;
              return (
                <TableRow key={booking.booking_id}>
                  <TableCell>{booking.hall_name}</TableCell>
                  <TableCell>{booking.table_name}</TableCell>
                  <TableCell>
                    {dayjs(booking.start_time).format("HH:mm")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="outlined" onClick={() => router.push("/bookinghistory")}>
        Смотреть полный список
      </Button>
    </Box>
  );
};

export default NearestBookings;
