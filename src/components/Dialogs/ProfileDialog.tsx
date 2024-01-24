import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ProfileForm from "../ProfileForm";
import { profile } from "@/utils/types";
import {
  useAddProfileMutation,
  useEditProfileMutation,
} from "@/storage/api/profilesApi";

type Props = {
  open: boolean;
  handleClose: (arg01: boolean) => void;
  restaurant_id: string;
  profileData?: profile;
};

const ProfileDialog = ({
  open,
  handleClose,
  restaurant_id,
  profileData,
}: Props) => {
  const [addProfile, state] = useAddProfileMutation();
  const [editProfile] = useEditProfileMutation();

  const handleForm = (data: profile) => {
    if (Object?.keys(profileData).length) {
      editProfile({
        ...data,
        restaurant_id,
        profile_index: profileData.profile_index,
      })
        .unwrap()
        .then(() => handleClose(false))
        .catch((error) => console.log(error));
    } else {
      addProfile({ ...data, restaurant_id, color: "#FFD700" })
        .unwrap()
        .then(() => handleClose(false))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Настройка профиля</DialogTitle>
      <DialogContent>
        <ProfileForm handleForm={handleForm} profileData={profileData} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
