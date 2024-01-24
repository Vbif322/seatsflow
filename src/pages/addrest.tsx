import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AddFormRest } from "../components/AddFormRest";
import DeleteIcon from "@mui/icons-material/Delete";
import { appBarHeight } from "../utils/constants";
import { FormProvider, useForm } from "react-hook-form";
import TimeTableForm from "@/components/Forms/TimeTableForm/TimeTableForm";
import { useAddRestaurantMutation } from "@/storage/api/restaurantsApi";
import { radioGroup, time_table } from "@/components/Forms/TimeTableForm/types";
import { workTime } from "@/utils/functions";

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
  const [timeTableRadio, setTimeTableRadio] =
    useState<radioGroup>("Круглосуточно");
  const [fieldsError, setFieldsError] = useState({});
  const [timeTable, setTimeTable] = useState<string[]>([]);
  const [openValue, setOpenValue] = useState([]);
  const [closeValue, setCloseValue] = useState([]);
  const [addRestaurant] = useAddRestaurantMutation();

  const methods = useForm();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (restname) => {
    fetchRest(restname);
  };

  const timeTableFormProps = {
    timeTableRadio,
    setTimeTableRadio,
    setFieldsError,
    fieldsError,
    timeTable,
    setTimeTable,
    openValue,
    setOpenValue,
    closeValue,
    setCloseValue,
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
  const handleTimeTableData = () => {
    let object: time_table = {};
    if (timeTable.length === 0) {
      return false;
    } else {
      for (let i = 0; i < timeTable.length; i++) {
        if (timeTable[i].length === 0) {
          setFieldsError((prev) => {
            const newFieldError = { ...prev };
            newFieldError["day_" + i] = "Необходимо заполнить";
            return newFieldError;
          });
          return false;
        } else {
          for (let j = 0; j < timeTable[i].length; j++) {
            if (typeof openValue[i] === "string" && openValue[i] !== "") {
            } else {
              setFieldsError((prev) => {
                const newFieldError = { ...prev };
                newFieldError["open_" + i] = "Необходимо заполнить";
                return newFieldError;
              });
              return false;
            }
            if (typeof closeValue[i] === "string" && closeValue[i] !== "") {
            } else {
              setFieldsError((prev) => {
                const newFieldError = { ...prev };
                newFieldError["close_" + i] = "Необходимо заполнить";
                return newFieldError;
              });
              return false;
            }
            if (Object.keys(fieldsError).length) {
              return false;
            } else {
              switch (timeTable[i][j]) {
                case "Понедельник":
                  object.Mon = workTime(openValue[i], closeValue[i]);
                  break;
                case "Вторник":
                  object.Tue = workTime(openValue[i], closeValue[i]);
                  break;
                case "Среда":
                  object.Wed = workTime(openValue[i], closeValue[i]);
                  break;
                case "Четверг":
                  object.Thu = workTime(openValue[i], closeValue[i]);
                  break;
                case "Пятница":
                  object.Fri = workTime(openValue[i], closeValue[i]);
                  break;
                case "Суббота":
                  object.Sat = workTime(openValue[i], closeValue[i]);
                  break;
                case "Воскресенье":
                  object.Sun = workTime(openValue[i], closeValue[i]);
                  break;
                default:
                  console.log(123);
                  break;
              }
            }
          }
        }
      }
      return object;
    }
  };

  const fetchRest = ({ restName }) => {
    const timeTableDataForm = handleTimeTableData();
    if (timeTableDataForm || timeTableRadio === "Круглосуточно") {
      addRestaurant({
        restaurant: {
          name: restName,
          halls: halls,
          time_table:
            timeTableRadio === "Круглосуточно" ? false : timeTableDataForm,
        },
      })
        .unwrap()
        .then((data) => {
          if (data.message === "OK") {
            setAlert(true);
            setHalls(initialHalls);
            setResetRow((prev) => !prev);
            setTimeout(() => setAlert(false), 5000);
            reset();
          } else console.log(data);
        });
    } else {
      return;
    }
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
      <FormProvider {...methods}>
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
                <Typography variant="h5">
                  Добавление нового ресторана
                </Typography>
                <Box>
                  <TextField
                    label="Название"
                    autoComplete="off"
                    name="restName"
                    error={!!errors.restName}
                    helperText={
                      errors.restName ? `${errors.restName?.message}` : ""
                    }
                    {...register("restName", {
                      required: {
                        value: true,
                        message: "Необходимо заполнить",
                      },
                    })}
                  />
                </Box>
                <TimeTableForm timeTableFormProps={timeTableFormProps} />
                <Typography variant="h5">Добавление зала</Typography>
                {halls.map((hall, i) => {
                  return (
                    <Box key={i}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
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
      </FormProvider>
    </>
  );
};

export default AddRest;
