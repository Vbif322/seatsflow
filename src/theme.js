import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1873FB",
    },
    secondary: {
      main: "#ECC1FF",
      light: "#F5DDFF",
    },
    analogs: {
      first: "#FFBEDF",
      second: "#E7FFBE",
      third: "#FDFFBE",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

export default theme;
