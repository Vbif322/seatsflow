import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import { BookingTable } from "../components/BookingTable";
import {
  useGetBookingsQuery,
  useGetOldBookingsQuery,
} from "../storage/api/bookingsApi";
import { useSelector } from "react-redux";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Box
      sx={{
        p: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="booking tabs"
          centered
        >
          <Tab label="Предстоящие Бронирования" {...a11yProps(0)} />
          <Tab label="История бронирований" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {!OldBookings.isLoading && (
          <BookingTable bookings={OldBookings.data?.oldBookings} />
        )}
      </CustomTabPanel>
    </Box>
  );
};

export default BookingHistory;
