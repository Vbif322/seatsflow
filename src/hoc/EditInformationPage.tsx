import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const EditInformationPage = ({ title, children }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: "65px",
        left: 0,
        bgcolor: "#fff",
        zIndex: 3001,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            margin: "4px",
            minWidth: "558px",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              minWidth: "558px",
              justifyContent: "start",
              alignItems: "center",
              gap: 2,
              m: 2,
            }}
          >
            <IconButton onClick={() => router.back()}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4">{title}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            margin: "4px",
            minWidth: "492px",
            justifyContent: "center",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              width: "492px",
              height: "222px",
              mt: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              padding: 4,
              justifyContent: "space-around",
            }}
          >
            {children}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default EditInformationPage;
