import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { RestCard } from "../components/RestCard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "@/storage/store";
import { fetchFullData } from "../storage/user/tokenSlice";

const MyRests = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const addRest = () => {
    router.push("/addrest");
  };
  const { restaurants, granted_restaurants } = useSelector(
    (state) => state.token
  );
  useEffect(() => {
    dispatch(fetchFullData(""));
  }, [dispatch]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5">Мои рестораны</Typography>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexFlow: "row wrap", gap: 2 }}>
          {restaurants.map((rest, i) => {
            return (
              <RestCard
                key={i}
                name={rest.name}
                id={rest.restaurant_id}
                index={i}
              />
            );
          })}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <IconButton sx={{ color: "black" }} onClick={addRest}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ mt: 8 }}>
        Со мной поделились
      </Typography>
      <Box sx={{ p: 2 }}>
        {granted_restaurants && (
          <Box sx={{ display: "flex", flexFlow: "row wrap", gap: 2 }}>
            {granted_restaurants.map((rest, i) => {
              return (
                <RestCard
                  key={i}
                  name={rest.name}
                  id={rest.restaurant_id}
                  index={i}
                  granted
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MyRests;
