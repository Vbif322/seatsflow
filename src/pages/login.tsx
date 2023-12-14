import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "@/storage/store";
import { resetError, setUserData } from "../storage/user/tokenSlice";
import { useRouter } from "next/router";
import api from "@/api";
import { setCookie } from "nookies";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.token);
  const [loginError, setLoginError] = useState(null);
  React.useEffect(() => {
    if (token) {
      router.push("/");
    }
    return () => {
      clearErrors();
      dispatch(resetError());
    };
  }, [token, clearErrors, dispatch, router]);

  const handleBtn = async (data: any) => {
    try {
      const userData = await api.getToken(data);
      dispatch(setUserData(userData));
      setCookie(null, "token", userData.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setLoginError(null);
    } catch (err) {
      setLoginError(err.error);
    }
  };

  const btnStyle = {
    borderRadius: "55px",
    height: "48px",
    fontWeight: "700",
  };

  return (
    <form onSubmit={handleSubmit((data) => handleBtn(data))}>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          bgcolor: "white",
          zIndex: 3000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Typography variant="h4">Seatsflow</Typography>
        <Box
          sx={{
            width: "496px",
            height: "434px",
            borderRadius: "20px",
            boxShadow: "0 20px 32px rgba(60,61,70,0.24)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            p: 4,
            boxSizing: "border-box",
          }}
        >
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography sx={{ alignSelf: "start", fontWeight: "700" }}>
              Вход
            </Typography>
            <Typography sx={{ color: "#d32f2f", fontSize: "1rem" }}>
              {error}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "432px",
              gap: 1,
            }}
          >
            <TextField
              label="Email"
              id="username"
              name="username"
              error={errors.username || error ? true : false}
              helperText={errors.username ? "Необходимо заполнить" : ""}
              {...register("username", {
                required: {
                  value: true,
                  message: "Необходимо заполнить",
                },
              })}
              autoFocus
            />
            <TextField
              label="Пароль"
              id="password"
              name="password"
              type="password"
              error={errors.password || error ? true : false}
              helperText={errors.password ? "Необходимо заполнить" : ""}
              {...register("password", {
                required: {
                  value: true,
                  message: "Необходимо заполнить",
                },
              })}
            />

            <Typography
              variant="body1"
              sx={{ alignSelf: "end", color: "grey", cursor: "pointer" }}
            >
              Восстановить пароль
            </Typography>
          </Box>
          <Typography>{loginError}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "432px",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={btnStyle}
              type="submit"
            >
              Войти
            </Button>
            <Button
              onClick={() => router.push("/register")}
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "rgba(0, 0, 0, 0.87)",
                ...btnStyle,
              }}
            >
              Регистрация
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
