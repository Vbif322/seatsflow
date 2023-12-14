import SettingBlock from "../components/SettingBlock";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const userInfo = useSelector((state: any) => state.token.userInfo);

  const mainSettings = {
    title: "Основная информация",
    rows: [
      {
        text1: "Фото профиля",
        text2: "Изменить фото",
        navigate: "photo",
      },
      {
        text1: "Логин",
        text2: userInfo.username,
        navigate: "name",
      },
      {
        text1: "Пароль",
        text2: "Изменить пароль",
        navigate: "password",
      },
    ],
  };
  const subscribeInfo = {
    title: "Подписка",
    rows: [
      {
        text1: "Текущий тариф",
        text2: userInfo.subscription,
      },
      {
        text1: "Окончание подписки",
        text2: userInfo.sub_expiry,
      },
    ],
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Настройки
      </Typography>
      <SettingBlock settingsValues={mainSettings} />
      <SettingBlock settingsValues={subscribeInfo} />
    </Box>
  );
};

export default SettingsPage;
