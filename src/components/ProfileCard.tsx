import { profile } from "@/utils/types";
import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = { profile: profile; children: ReactNode };

const ProfileCard = ({ profile, children }: Props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "300px",
        borderRadius: "15px",
        p: 3,
        boxSizing: "border-box",
        border: profile.main ? "2px solid black" : "",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{profile.name}</Typography>
        <Typography>Длительность брони: {profile.booking_time}</Typography>
        <Typography>Время уборки: {profile.cleaning_time}</Typography>
        <Typography>Время удержания: {profile.hold_time}</Typography>
        <Typography>Время ожидания: {profile.waiting_time}</Typography>
        {children}
      </Box>
    </Paper>
  );
};

export default ProfileCard;
