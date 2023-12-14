import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import ProfileForm from "../ProfileForm";

type Props = { open: boolean; handleClose: (arg01: boolean) => void };

const ProfileDialog = ({ open, handleClose }: Props) => {
  const sendForm = () => {
    handleClose(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Настройка профиля</DialogTitle>
      <DialogContent>
        <ProfileForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
