import { useDeleteRestaurantMutation } from "@/storage/api/restaurantsApi";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "@/storage/store";
import ProfileDialog from "@/components/Dialogs/ProfileDialog";
import ProfileCard from "@/components/ProfileCard";
import { profile } from "@/utils/types";
import {
  useDeleteProfileMutation,
  useGetProfileQuery,
} from "@/storage/api/profilesApi";
import { parseTimeTable } from "@/utils/functions";
import TimeTable from "@/components/TimeTable/TimeTable";

const RestPage = () => {
  const router = useRouter();
  const { restaurants, granted_restaurants } = useSelector(
    (state) => state.token
  );
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const [pickedRest] = restaurants
    .concat(granted_restaurants)
    .filter((rest) => router.query.id === rest.restaurant_id);
  const [profileData, setProfileData] = useState<profile>({});
  const getProfiles = useGetProfileQuery(
    {
      rest_id: pickedRest?.restaurant_id,
    },
    {
      skip: !pickedRest?.restaurant_id,
    }
  );

  parseTimeTable(pickedRest?.time_table);

  const deleteHandler = () => {
    deleteRestaurant({ restaurant_id: router.query.id });
    router.push("/myrests");
  };

  const patchProfile = (profile: profile, profile_index: number) => {
    setProfileData({ ...profile, profile_index });
    setOpenProfileDialog(true);
  };

  const deleteProfileHandler = (i: number) => {
    deleteProfile({
      restaurant_id: pickedRest.restaurant_id,
      profile_index: i,
    });
  };

  if (!pickedRest) {
    return <p>Такого ресторана не существует</p>;
  }
  if (getProfiles.isSuccess) {
    return (
      <Box p={2}>
        <Typography variant="h5">{pickedRest.name}</Typography>
        <Typography>Количество залов: {pickedRest.halls.length}</Typography>
        <Typography>График работы</Typography>
        <TimeTable time_table={pickedRest.time_table} />
        <Typography variant="h6" sx={{ pt: 2, pb: 2 }}>
          Текущий профиль ресторана
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {getProfiles.data.map((profile: profile, i: number) => {
            return (
              <ProfileCard profile={profile} key={i}>
                <Box sx={{ pt: 2, display: "flex", gap: 2 }}>
                  <Button
                    onClick={() => patchProfile(profile, i)}
                    variant="contained"
                    color="secondary"
                  >
                    Изменить
                  </Button>
                  <Button
                    onClick={() => deleteProfileHandler(i)}
                    variant="outlined"
                    color="error"
                  >
                    Удалить
                  </Button>
                </Box>
              </ProfileCard>
            );
          })}
        </Box>
        <Box sx={{ mt: 2 }}>
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
          restaurant_id={pickedRest.restaurant_id}
          profileData={profileData}
        />
      </Box>
    );
  }
};

export default RestPage;
