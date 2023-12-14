import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, SetStateAction } from "react";
import { AddFormRest } from "../components/AddFormRest";
import DeleteIcon from "@mui/icons-material/Delete";
import { appBarHeight } from "../utils/constants";
import api from "../api";
import { useForm } from "react-hook-form";

const AddRest = () => {
  const initialHalls = [
    {
      name: "Зал 1",
      tables: {
        name: "стол 1",
        capacity: 2,
      },
    },
  ];

  const [halls, setHalls] = useState(initialHalls);
  const [alert, setAlert] = useState(false);
  const [resetRow, setResetRow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (restname) => {
    fetchRest(restname);
    reset();
  };

  const hallsAddHandler = () => {
    setHalls((prev: any) => [
      ...prev,
      {
        name: `Зал ${prev.length + 1}`,
        tables: [
          {
            name: "стол 1",
            capacity: 2,
          },
        ],
      },
    ]);
  };

  const hallsDeleteHandler = (i) => {
    setHalls((prev) => prev.toSpliced(i, 1));
  };

  const updateHalls = React.useCallback(
    (data, i) => {
      const newHalls = [...halls];
      newHalls[i]["tables"] = data;
      setHalls(newHalls);
    },
    [halls]
  );

  const fetchRest = ({ restName }) => {
    api
      .addRestaurant({
        restaurant: {
          name: restName,
          halls: halls,
        },
      })
      .then((data) => {
        if (data.message === "OK") {
          setAlert(true);
          setHalls(initialHalls);
          setResetRow((prev) => !prev);
          setTimeout(() => setAlert(false), 5000);
        } else console.log(data);
      });
  };

  return (
    <>
      {alert && (
        <Box sx={{ position: "absolute", left: 16, zIndex: 3000, bottom: 32 }}>
          <Alert severity="success" onClose={() => setAlert(false)}>
            Ресторан успешно добавлен
          </Alert>
        </Box>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: `calc(100% - ${appBarHeight}px)`,
          }}
        >
          <Box>
            <Box
              sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Typography variant="h5">Добавление нового ресторана</Typography>
              <Box>
                <TextField
                  label="Название"
                  autoComplete="off"
                  name="restName"
                  error={errors.restName === undefined ? false : true}
                  helperText={errors.restName ? "" : "Необходимо заполнить"}
                  {...register("restName", {
                    required: {
                      value: true,
                      message: "Необходимо заполнить",
                    },
                  })}
                />
              </Box>
              <Typography variant="h5">Добавление зала</Typography>
              {halls.map((hall, i) => {
                return (
                  <Box key={i}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Typography variant="h6">{hall.name}</Typography>
                      <IconButton onClick={() => hallsDeleteHandler(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <AddFormRest
                      updateHalls={updateHalls}
                      index={i}
                      resetRow={resetRow}
                    />
                  </Box>
                );
              })}
              <Box>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ mt: 4 }}
                  onClick={hallsAddHandler}
                >
                  Добавить зал
                </Button>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", p: 4 }}>
            <Button variant="contained" color="secondary" type="submit">
              Сохранить
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddRest;
