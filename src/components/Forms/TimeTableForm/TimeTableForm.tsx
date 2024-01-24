import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import SelectMUI from "./SelectTimeTable";
import CloseIcon from "@mui/icons-material/Close";
import { radioGroup } from "./types";
import { parseNumber } from "@/utils/functions";

type Props = {
  timeTableFormProps: {
    setTimeTableRadio: (string: string) => void;
    timeTableRadio: radioGroup;
    setFieldsError: (callback: object) => void;
    fieldsError: object;
    setTimeTable: (arg: string[]) => void;
    timeTable: string[];
    openValue: string[];
    setOpenValue: (arg: string[]) => void;
    closeValue: string[];
    setCloseValue: (arg: string[]) => void;
  };
};

const WEEK = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const timeStyle = { width: 100, mt: 1 };

const TimeTableForm = ({ timeTableFormProps }: Props) => {
  const [intervalRows, setIntervalRows] = useState(1);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const closeRef = useRef(null);

  const {
    timeTableRadio,
    setTimeTableRadio,
    setFieldsError,
    fieldsError,
    setTimeTable,
    timeTable,
    openValue,
    setOpenValue,
    closeValue,
    setCloseValue,
  } = timeTableFormProps;

  const handleTimeTable = (data, i: number) => {
    const newTimeTable = [...timeTable];
    newTimeTable[i] = data;
    setTimeTable(newTimeTable);
    if (fieldsError["day_" + i] && data) {
      setFieldsError((prev) => {
        const newFieldError = { ...prev };
        delete newFieldError["day_" + i];
        return newFieldError;
      });
    }
  };

  const handleOpenValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const newValue = [...openValue];
    newValue[i] = parseNumber(e.target.value);
    closeRef.current = document.querySelector(`input[name="close_${i}"]`);
    if (parseNumber(e.target.value).length === 5) {
      closeRef.current.focus();
    }
    setOpenValue(newValue);
    if (fieldsError["open_" + i] && e.target.value) {
      setFieldsError((prev) => {
        const newFieldError = { ...prev };
        delete newFieldError["open_" + i];
        return newFieldError;
      });
    }
  };

  const handleCloseValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    i: number
  ) => {
    const newValue = [...closeValue];
    newValue[i] = parseNumber(e.target.value);
    setCloseValue(newValue);
    if (fieldsError["close_" + i] && e.target.value) {
      setFieldsError((prev) => {
        const newFieldError = { ...prev };
        delete newFieldError["close_" + i];
        return newFieldError;
      });
    }
  };

  const handleIntervalRow = (i: number) => {
    setIntervalRows((prev) => prev - 1);
    setSelectedNames((prev) => prev.filter((x) => !timeTable[i].includes(x)));
  };

  return (
    <Box sx={{ width: "600px" }}>
      <Typography>Режим работы</Typography>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={timeTableRadio}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTimeTableRadio((event.target as HTMLInputElement).value)
        }
      >
        <FormControlLabel
          value="Круглосуточно"
          control={<Radio />}
          label="Круглосуточно"
        />
        <FormControlLabel
          value="Настроить"
          control={<Radio />}
          label="Настроить"
        />
      </RadioGroup>
      {timeTableRadio === "Настроить" && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: "column",
          }}
        >
          {[...Array(intervalRows)].map((row, i) => {
            return (
              <Box
                key={`selector-${i}`}
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  alignItems: "flex-start",
                  mt: 2,
                }}
              >
                <SelectMUI
                  names={WEEK}
                  selectedNames={selectedNames}
                  setSelectedNames={setSelectedNames}
                  handleTimeTable={handleTimeTable}
                  index={i}
                  error={!!fieldsError["day_" + i]}
                  helperText={
                    fieldsError["day_" + i] ? fieldsError["day_" + i] : ""
                  }
                />
                <TextField
                  value={openValue[i] ? openValue[i] : ""}
                  onChange={(e) => handleOpenValue(e, i)}
                  sx={timeStyle}
                  autoComplete="off"
                  error={!!fieldsError["open_" + i]}
                  helperText={
                    fieldsError["open_" + i] ? fieldsError["open_" + i] : ""
                  }
                  placeholder="__:__"
                  type="tel"
                  name={"open_" + i}
                />
                <Typography fontSize={"36px"}>-</Typography>
                <TextField
                  value={closeValue[i] ? closeValue[i] : ""}
                  onChange={(e) => handleCloseValue(e, i)}
                  sx={timeStyle}
                  autoComplete="off"
                  error={!!fieldsError["close_" + i]}
                  helperText={
                    fieldsError["close_" + i] ? fieldsError["close_" + i] : ""
                  }
                  placeholder="__:__"
                  type="tel"
                  inputRef={closeRef}
                  name={"close_" + i}
                />
                {intervalRows > 1 && (
                  <IconButton onClick={() => handleIntervalRow(i)}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            );
          })}
          <Button
            variant="outlined"
            sx={{ alignSelf: "center", width: "100%" }}
            onClick={() => setIntervalRows((prev) => prev + 1)}
          >
            Добавить интервал
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TimeTableForm;
