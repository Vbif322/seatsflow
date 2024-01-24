import OrderTable from "@/components/Tables/OrderTable/OrderTable";
import { useGetOrderQuery } from "@/storage/api/ordersApi";
import { useSelector } from "@/storage/store";
import { order } from "@/utils/types";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {};

const Orders = (props: Props) => {
  const restID = useSelector((state) => state.token.chosenRest.restaurant_id);

  const { data } = useGetOrderQuery(restID, {
    skip: restID === undefined,
  });

  return (
    <Box p={2}>
      <Typography variant="h4">Заявки на бронирования</Typography>
      <OrderTable orders={data?.orders} />
    </Box>
  );
};

export default Orders;
