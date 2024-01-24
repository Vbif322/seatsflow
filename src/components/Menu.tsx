import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import PatternIcon from "@mui/icons-material/Pattern";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { drawerWidth } from "../utils/constants";
import { Logo } from "./Logo";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import theme from "../theme";
import { usePathname } from "next/navigation";
import CampaignIcon from "@mui/icons-material/Campaign";

const MenuItem = ({ text, children, isActive }) => {
  return (
    <ListItem
      disablePadding
      sx={{
        bgcolor: isActive ? theme.palette.secondary.light : "",
        borderRadius: "0 72px 72px 0",
      }}
    >
      <ListItemButton>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

const Menu = () => {
  const pathname = usePathname();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar sx={{ height: "64px" }}>
        <Logo />
      </Toolbar>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <Link href="/">
            <MenuItem text={"Главная"} isActive={pathname === "/"}>
              <DashboardIcon />
            </MenuItem>
          </Link>
          <Link href="/orders">
            <MenuItem text={"Заявки"} isActive={pathname === "/orders"}>
              <CampaignIcon />
            </MenuItem>
          </Link>
          <Link href="/addbooking">
            <MenuItem
              text={"Добавить бронирование"}
              isActive={pathname === "/addbooking"}
            >
              <AddIcon />
            </MenuItem>
          </Link>
          <Link href="/bookinghistory">
            <MenuItem
              text={"Бронирования"}
              isActive={pathname === "/bookinghistory"}
            >
              <HistoryIcon />
            </MenuItem>
          </Link>
          <Link href="/edittemplate">
            <MenuItem
              text={"Шаблон заведения"}
              isActive={pathname === "/edittemplate"}
            >
              <PatternIcon />
            </MenuItem>
          </Link>
          <Link href="/subusers">
            <MenuItem
              text={"Дополнительные пользователи"}
              isActive={pathname === "/subusers"}
            >
              <PeopleIcon />
            </MenuItem>
          </Link>
          <Link href="/myrests">
            <MenuItem text={"Мои заведения"} isActive={pathname === "/myrests"}>
              <RestaurantIcon />
            </MenuItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/settings">
            <MenuItem text={"Настройки"} isActive={pathname === "/settings"}>
              <SettingsIcon />
            </MenuItem>
          </Link>
          <MenuItem
            text={"Служба поддержки"}
            isActive={pathname === "/support"}
          >
            <SupportAgentIcon />
          </MenuItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Menu;
