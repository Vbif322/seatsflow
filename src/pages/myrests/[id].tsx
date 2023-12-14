import { useDeleteRestaurantMutation } from "@/storage/api/restaurantsApi";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "@/storage/store";
import ProfileDialog from "@/components/Dialogs/ProfileDialog";

const RestPage = () => {
  const router = useRouter();
  const { restaurants, granted_restaurants } = useSelector(
    (state) => state.token
  );
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const [pickedRest] = restaurants
    .concat(granted_restaurants)
    .filter((rest) => router.query.id === rest.restaurant_id);

  const deleteHandler = () => {
    deleteRestaurant({ restaurant_id: router.query.id });
    router.push("/myrests");
  };

  if (!pickedRest) {
    return <p>Такого ресторана не существует</p>;
  }
  return (
    <Box p={2}>
      <Typography variant="h5">{pickedRest.name}</Typography>
      <Typography variant="h6" sx={{ pt: 2, pb: 2 }}>
        Текущий профиль ресторана
      </Typography>
      <Typography>Количество залов: {pickedRest.halls.length}</Typography>
      <Typography>
        booking_time: {pickedRest.profiles[0].booking_time}
      </Typography>
      <Typography>
        cleaning_time: {pickedRest.profiles[0].cleaning_time}
      </Typography>
      <Typography>hold_time: {pickedRest.profiles[0].hold_time}</Typography>
      <Typography>
        waiting_time: {pickedRest.profiles[0].waiting_time}
      </Typography>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Button>Изменить профиль</Button>
        <Button onClick={() => setOpenProfileDialog(true)}>
          Добавить профиль
        </Button>
      </Box>
      <Box>
        <Button disabled>Изменить ресторан</Button>
        <Button onClick={deleteHandler}>Удалить ресторан</Button>
      </Box>
      <ProfileDialog
        open={openProfileDialog}
        handleClose={setOpenProfileDialog}
      />
    </Box>
  );
};

export default RestPage;
