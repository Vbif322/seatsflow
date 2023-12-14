import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch, useSelector } from "@/storage/store";
import { changeRest } from "../storage/user/tokenSlice";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/router";

export const RestCard = ({ name, id, index, granted = false }) => {
  const [chosen, setChosen] = useState(false);
  const [elevation, setElevation] = useState(3);
  const { chosenRest } = useSelector((state) => state.token);
  useEffect(() => {
    if (chosenRest?.restaurant_id === id) {
      setChosen(true);
    } else setChosen(false);
  }, [chosenRest, id]);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Paper
      elevation={elevation}
      onMouseEnter={() => setElevation(6)}
      onMouseLeave={() => setElevation(3)}
      sx={{
        width: "250px",
        height: "250px",
        borderRadius: "15px",
        p: 3,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "160px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {chosen ? (
            <>
              <Typography variant="subtitle2">Выбран</Typography>
              <CircleIcon color="error" />
            </>
          ) : (
            <>
              <Typography variant="subtitle2"> Не выбран</Typography>
              <CircleOutlinedIcon
                onClick={() => dispatch(changeRest({ granted, id: index }))}
                sx={{ cursor: "pointer" }}
              />
            </>
          )}
        </Box>
        <Typography variant="h5" component="p">
          {name}
        </Typography>
        <Typography variant="subtitle2" sx={{ justifySelf: "end" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="subtitle2">Броней сегодня: 6 </Typography>
        </Box>
        <IconButton onClick={() => router.push(`/myrests/${id}`)}>
          <EastIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};
