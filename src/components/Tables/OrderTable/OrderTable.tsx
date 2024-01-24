import { useDeleteOrderMutation } from "@/storage/api/ordersApi";
import { order } from "@/utils/types";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  orders: order[];
};

const OrderTable = ({ orders = [] }: Props) => {
  const [visible, setVisible] = useState(false);
  const [picked, setPicked] = useState(false);
  const [editOrder, setEditOrder] = useState<order>();
  const [prevRow, setPrevRow] = useState<any>("");

  const [deleteOrder] = useDeleteOrderMutation();

  const router = useRouter();

  const editRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    order: order
  ) => {
    setEditOrder(order);
    e.stopPropagation();
    if (
      ((e.target as HTMLTableRowElement).parentElement as HTMLTableRowElement)
        .bgColor
    ) {
      (
        (e.target as HTMLTableRowElement).parentElement as HTMLTableRowElement
      ).bgColor = "";
      setVisible(false);
      setPicked(false);
    } else {
      if (!picked) {
        setVisible(true);
        setPicked(true);
        setPrevRow((e.target as HTMLTableRowElement).parentElement);
        (
          (e.target as HTMLTableRowElement).parentElement as HTMLTableRowElement
        ).bgColor = "wheat";
      } else {
        (
          (e.target as HTMLTableRowElement).parentElement as HTMLTableRowElement
        ).bgColor = "wheat";
        prevRow.bgColor = "";
        setPrevRow((e.target as HTMLTableRowElement).parentElement);
        return;
      }
    }
  };
  const deleteRowHandler = () => {
    deleteOrder(editOrder.order_id)
      .unwrap()
      .then((res) => {
        setEditOrder(undefined);
        setPicked(false);
        setVisible(false);
        prevRow.bgColor = "";
      });
  };

  return (
    <Box>
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
              <TableCell>Дата</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Количество гостей</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => {
              return (
                <TableRow key={i} onClick={(e) => editRow(e, order)}>
                  <TableCell>
                    {dayjs(order.start_time).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(order.start_time).format("HH:mm")}
                  </TableCell>
                  <TableCell>{order.visitor_amount}</TableCell>
                  <TableCell>{order.visitor_name}</TableCell>
                  <TableCell>{order.visitor_phone}</TableCell>
                  <TableCell>{order.visitor_comment}</TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={() =>
                        router.push({ pathname: "addbooking", query: order })
                      }
                    >
                      Создать
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {visible && (
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, pt: 2 }}>
          <Button variant="contained" color="error" onClick={deleteRowHandler}>
            Удалить
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OrderTable;
