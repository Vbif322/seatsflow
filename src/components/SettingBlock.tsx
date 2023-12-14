import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";

const SettingBlock = ({ settingsValues }) => {
  const { title, rows } = settingsValues;
  const boxStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    p: 2,
    ":hover": {
      bgcolor: "rgba(0,0,0,0.05)",
    },
  };
  const iconStyle = {
    justifySelf: "end",
  };

  const textStyle = {
    color: "rgb(95,99,104)",
    fontWeight: "500",
    fontSize: "0.8rem",
  };
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
        },
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" m={2}>
          {title}
        </Typography>
        {rows.map((row, i) => {
          return (
            <Box key={i}>
              <Box
                sx={boxStyle}
                onClick={
                  row.navigate
                    ? () => router.push(`/settings/${row.navigate}`)
                    : () => {}
                }
              >
                <Typography sx={textStyle}>{row.text1}</Typography>
                <Typography
                  variant={
                    row.text2?.startsWith("Изменить") ? "body2" : "body1"
                  }
                >
                  {row.text2}
                </Typography>
                {row.navigate ? <NavigateNextIcon sx={iconStyle} /> : <></>}
              </Box>
              {i === rows.length - 1 ? <></> : <Divider />}
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default SettingBlock;
