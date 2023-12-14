import {
  Box,
  Button,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const AddFormRest = ({ updateHalls, index, resetRow }) => {
  const initialTables = useMemo(
    () => [
      {
        name: "стол 1",
        capacity: 2,
      },
    ],
    []
  );

  const [tables, setTables] = React.useState(initialTables);

  React.useEffect(() => {
    setTables(initialTables);
  }, [resetRow, initialTables]);

  const tablesAddHandler = () => {
    const newTables = [
      ...tables,
      {
        name: `стол ${tables.length + 1}`,
        capacity: 2,
      },
    ];
    updateHalls(newTables, index);
    setTables(newTables);
  };

  const tablesValueHandler = (e, i, param) => {
    const newTables = [...tables];
    newTables[i][param] = e.target.value;
    updateHalls(newTables, index);
    setTables(newTables);
  };

  const tablesDeleteHandler = (i) => {
    const newTables = [...tables];
    updateHalls(newTables.toSpliced(i, 1), index);
    setTables(newTables.toSpliced(i, 1));
  };
  return (
    <Box>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Количество мест</TableCell>
              <TableCell>Удалить стол</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => tablesValueHandler(e, i, "name")}
                      value={table.name}
                      name={`name_${i}`}
                      size="small"
                      autoComplete="off"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => tablesValueHandler(e, i, "capacity")}
                      value={table.capacity}
                      name={`capacity_${i}`}
                      size="small"
                      autoComplete="off"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => tablesDeleteHandler(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="outlined"
        size="small"
        sx={{ mt: 2 }}
        onClick={tablesAddHandler}
      >
        Добавить стол
      </Button>
    </Box>
  );
};
