import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "./Menu";
import { drawerWidth } from "../utils/constants";
import { useDispatch, useSelector } from "@/storage/store";
import { logout } from "../storage/user/tokenSlice";
import { useRouter } from "next/router";
import { resetBookings } from "../storage/bookingSlice";
import { destroyCookie } from "nookies";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo, chosenRest } = useSelector((state) => state.token);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ alignItems: "center", gap: "10px" }}>
          <Typography variant="h6" color={"black"}>
            Выбрано заведение: {chosenRest?.name}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Уведомления">
              <IconButton>
                <AddAlertIcon />
              </IconButton>
            </Tooltip>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  router.push("/login");
                  dispatch(logout());
                  dispatch(resetBookings());
                  destroyCookie(null, "token");
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Typography color={"black"}>{userInfo.username}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu />
    </Box>
  );
};

export default Header;
