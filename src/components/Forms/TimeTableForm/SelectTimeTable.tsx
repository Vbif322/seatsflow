import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckIcon from "@mui/icons-material/Check";
import { Box, FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      //   maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectMUI({
  names,
  selectedNames,
  setSelectedNames,
  handleTimeTable,
  index,
  error,
  helperText,
}) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  React.useEffect(() => {
    handleTimeTable(personName, index);
  }, [personName]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      (prevPerson) => {
        let tempValue = typeof value === "string" ? value.split(",") : value;
        let deleteValue = prevPerson.filter((y) => !tempValue.includes(y));
        if (tempValue.length > prevPerson.length) {
          setSelectedNames((prev) =>
            prev.concat(tempValue.filter((y) => !prev.includes(y)))
          );
        } else {
          setSelectedNames((prev) => prev.filter((x) => x != deleteValue));
        }

        return tempValue;
      }
    );
  };

  const renderValues = (selected: string[]) => {
    if (selected.length < 4) {
      return selected.join(", ");
    } else {
      return selected
        .map((item) => {
          switch (item) {
            case "Понедельник":
              return "Пн";
            case "Вторник":
              return "Вт";
            case "Среда":
              return "Ср";
            case "Четверг":
              return "Чт";
            case "Пятница":
              return "Пт";
            case "Суббота":
              return "Сб";
            default:
              return "Вс";
          }
        })
        .join(", ");
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} error={error}>
        <InputLabel id="multiple-checkbox-label">Дни</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Дни" />}
          renderValue={(selected) => renderValues(selected)}
          MenuProps={MenuProps}
        >
          {names.map((name: string) => {
            return (
              <MenuItem
                key={name}
                value={name}
                disabled={
                  selectedNames?.indexOf(name) > -1 &&
                  personName?.indexOf(name) === -1
                }
              >
                {personName.indexOf(name) > -1 ? (
                  <CheckIcon sx={{ mr: 1 }} />
                ) : (
                  <Box sx={{ width: "24px", mr: 1 }}></Box>
                )}
                <ListItemText primary={name} />
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
