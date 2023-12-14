import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import api from "../api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBtn = (data) => {
    api.register(data).then((res) => {
      console.log(res);
      router.push("/login");
    });
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
        <Typography variant="h4">PO RESTORANAM</Typography>
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
          }}
        >
          <Typography sx={{ alignSelf: "start", ml: 4, fontWeight: "700" }}>
            Регистрация
          </Typography>
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
              id="usernameRegister"
              name="username"
              error={errors.username ? true : false}
              helperText={errors.username ? "Необходимо заполнить" : ""}
              {...register("username", {
                required: {
                  value: true,
                  message: "Необходимо заполнить",
                },
                pattern: {
                  value: /^\w+@[a-zA-Z_]+?\.\w{2,6}$/,
                  message: "Должен быть email",
                },
              })}
              autoFocus
            />
            <TextField
              label="Пароль"
              id="passwordRegister"
              name="password"
              type="password"
              error={errors.password ? true : false}
              helperText={
                errors.password ? "Должно быть не менее 5 символов" : ""
              }
              {...register("password", {
                required: {
                  value: true,
                  message: "Необходимо заполнить",
                },
                minLength: {
                  value: 5,
                  message: "Должно быть не менее 5 символов",
                },
              })}
            />
            <Typography
              variant="body1"
              sx={{ alignSelf: "end", color: "grey" }}
            >
              Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и
              Политикой конфиденциальности и соглашаетесь на информационную
              рассылку.
            </Typography>
          </Box>
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
              Зарегистрироваться
            </Button>
            <Button
              onClick={() => router.push("/login")}
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "rgba(0, 0, 0, 0.87)",
                ...btnStyle,
              }}
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default RegisterPage;
