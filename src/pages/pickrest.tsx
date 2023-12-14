import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { RestaurantCard } from "../components/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { changeRest } from "../storage/user/tokenSlice";
import { appBarHeight } from "../utils/constants";
import { useRouter } from "next/router";

const PickRest = () => {
  const restaurants = useSelector((state: any) => state.token.restaurants);
  const router = useRouter();
  const dispatch = useDispatch();

  const changeRestHandler = (i, id) => {
    dispatch(changeRest(i));
  };

  const addRest = () => {
    router.push("/addrest");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        height: `calc(100vh - ${appBarHeight}px)`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          //   justifyContent: "space-around",
          padding: 4,
          gap: 4,
          width: "100%",
          ml: "150px",
        }}
      >
        {restaurants.map((rest, i) => {
          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <RestaurantCard
                title={rest.name}
                // changeRestHandler={changeRestHandler}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => changeRestHandler(i, rest.restaurant_id)}
              >
                Выбрать
              </Button>
            </Box>
          );
        })}
      </Box>
      <IconButton sx={{ color: "black" }} onClick={addRest}>
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default PickRest;
