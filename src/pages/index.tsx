import { Alert, Box, Button, Typography } from "@mui/material";
import React from "react";
import "dayjs/locale/ru";
import NearestBookings from "../components/NearestBookings";
import { useDispatch, useSelector } from "@/storage/store";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { fetchFullData, logout } from "../storage/user/tokenSlice";
import dayjs from "dayjs";
import {
  useAddBookingMutation,
  useGetBookingsQuery,
} from "../storage/api/bookingsApi";
import { ListRestCards } from "../components/ListRestCards";
import { findID } from "../utils/functions";
import { useRouter } from "next/router";
import { isErrorWithMessage, isFetchBaseQueryError } from "@/utils/helpers";
import OrderForm from "@/components/Forms/OrderForm/OrderForm";
import { setAlerts } from "@/storage/alertSlice";
import { useAddOrderMutation } from "@/storage/api/ordersApi";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { restaurants, error, chosenRest, granted_restaurants } = useSelector(
    (state) => state.token
  );
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchFullData(""));
    }
  }, [dispatch]);

  const { data } = useGetBookingsQuery(
    {
      restaurant_id: chosenRest?.restaurant_id,
    },
    { skip: restaurants.length === 0 }
  );

  const [addBookingData] = useAddBookingMutation();
  const [addOrder] = useAddOrderMutation();

  const addBookingHandler = async (data) => {
    let fullDate = dayjs(
      `${data.date.format("YYYY-MM-DDT")}${data.time.format("HH:mm:ssZ")}`
    );
    try {
      await addOrder({
        restaurant_id: chosenRest.restaurant_id,
        visitor_name: data.visitor_name,
        visitors_amount: data.visitor_amount,
        start_time: fullDate.format(),
        visitor_phone: data.visitor_phone,
        visitor_comment: data.visitor_comment,
      })
        .unwrap()
        .then(() =>
          dispatch(setAlerts({ type: "success", text: "Заявка создана" }))
        );
    } catch (err) {
      dispatch(setAlerts({ type: "error", text: "Произошла ошибка" }));
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

  if (error) {
    if (error === "Неверный токен") {
      dispatch(logout());
    } else return <p>{error}</p>;
  }

  if (restaurants.length === 0 && granted_restaurants.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          mt: 15,
        }}
      >
        <Typography variant="h4">
          У вас пока нет ресторанов, добавим?
        </Typography>
        <Button
          onClick={() => router.push("addrest")}
          variant="contained"
          color="secondary"
        >
          Добавить
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 8 }}>
        {chosenRest?.name}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="subtitle1" mb={4}>
            Создать бронирование
          </Typography>
          <OrderForm submitFunc={addBookingHandler} />
          {restaurants.length >= 0 ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ mt: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography>Список моих заведений</Typography>
                  {restaurants.concat(granted_restaurants).length > 3 ? (
                    <Box
                      onClick={() => router.push("/myrests")}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        boxSizing: "border-box",
                        gap: 1,
                        p: 1,
                        "&:hover": {
                          background: "#efefef",
                          borderRadius: "10px",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Typography>Смотреть все</Typography>
                      <KeyboardDoubleArrowRightIcon color="action" />
                    </Box>
                  ) : (
                    <></>
                  )}
                </Box>
                <ListRestCards
                  restaurants={restaurants}
                  granted_restaurants={granted_restaurants}
                />
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <NearestBookings bookings={data?.futureBookings} />
      </Box>
    </Box>
  );
}

// Home.getInitialProps = wrapper.getInitialPageProps(
//   (store) =>
//     ({ pathname, req, res }) => {
//       console.log("2. Page.getInitialProps uses the store to dispatch things");
//       store.dispatch({
//         type: "TICK",
//         payload: "was set in error page " + pathname,
//       });
//     }
// );
