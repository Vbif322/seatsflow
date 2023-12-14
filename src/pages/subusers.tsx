import {
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import React from "react";
import { SubuserRow } from "../components/SubuserRow";
import AddIcon from "@mui/icons-material/Add";
import { appBarHeight } from "../utils/constants";
import { useGetSubusersQuery } from "../storage/api/subusersApi";
import { addSubuser, setSubusersData } from "../storage/SubusersSlice";
import { useSelector, useDispatch } from "@/storage/store";

const Subusers = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetSubusersQuery("");

  React.useEffect(() => {
    document.title = "Дополнительные пользователи";
    if (!isLoading && !error) {
      dispatch(setSubusersData({ data, error }));
    }
  }, [isLoading, data, dispatch, error]);
  const subusers = useSelector((state) => state.subusers.subusers);

  const addSubuserHandler = () => {
    dispatch(addSubuser());
  };

  if (error) {
    console.log(error);
  }
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: `calc(100% - ${appBarHeight}px)`,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Пользователи</Typography>
        </Box>
        <Box>
          <Paper
            sx={{
              width: "100%",
              height: "73px",
              display: "grid",
              p: 2,
              boxSizing: "border-box",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box width={"60%"}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Доступно</Typography>
                  <Typography>{subusers.length + "/" + 5}</Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(subusers.length / 5) * 100}
                />
              </Box>
              <Button variant="outlined">Нужно больше?</Button>
            </Stack>
          </Paper>
        </Box>
        <Divider sx={{ mt: 4 }} />
        <TableContainer>
          <Table>
            <TableBody>
              {subusers.map((subuser, i) => {
                return (
                  <SubuserRow key={i} editting={subuser.editting} index={i} />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {subusers.length < 5 ? (
          <IconButton
            sx={{ mt: 4, color: "black" }}
            onClick={addSubuserHandler}
          >
            <AddIcon />
          </IconButton>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Subusers;
