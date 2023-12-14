import {
  Avatar,
  Box,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MultipleSelectChip from "./MultipleSelectChip";
import { useDispatch, useSelector } from "@/storage/store";
import { deleteSubuser, updateSubData } from "../storage/SubusersSlice";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddSubuserMutation,
  useDeleteSubuserMutation,
  useEditSubuserMutation,
} from "../storage/api/subusersApi";

export const SubuserRow = ({ editting = false, index }) => {
  const data = useSelector((state) => state.subusers.subusers);
  const restaurantsData = useSelector((state) => state.token.restaurants);
  const { custom_name, username, restaurants } = data[index];
  const [localEditting, setlocalEditting] = useState(editting);
  const [localName, setLocalName] = useState(custom_name);
  const [localLogin, setLocalLogin] = useState(username);
  const [edittableLogin, setEdittableLogin] = useState(false);
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState(
    restaurants ? restaurants.map((rest) => rest.name) : []
  );

  useEffect(() => {
    setLocalName(custom_name);
    setLocalLogin(username);
    if (!localLogin) {
      setEdittableLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, custom_name, username]);

  const [addSubuser, addSubuserState] = useAddSubuserMutation();
  const [editSubuser, editSubuserState] = useEditSubuserMutation();
  const [deleteSubuserData, deleteSubuserDataState] =
    useDeleteSubuserMutation();

  const findRestId = () => {
    let tempArr = [];
    for (let i = 0; i < personName.length; i++) {
      for (let j = 0; j < restaurantsData.length; j++) {
        if (personName[i] === restaurantsData[j]["name"]) {
          tempArr.push(restaurantsData[j]["restaurant_id"]);
        }
      }
    }
    return tempArr;
  };

  const handleAddSubuser = async () => {
    if (!data.includes(localLogin) && edittableLogin) {
      await addSubuser({
        custom_name: localName,
        username: localLogin,
        restaurant_ids: findRestId(),
      });
    } else {
      await editSubuser({
        custom_name: localName,
        username: localLogin,
        restaurant_ids: findRestId(),
      });
    }
  };

  const handleDeleteSubuser = async () => {
    if (!edittableLogin) {
      dispatch(deleteSubuser(index));
      await deleteSubuserData({ username: localLogin });
    } else {
      dispatch(deleteSubuser(index));
    }
  };

  const handler = (e, setFunction) => {
    setFunction(e.target.value);
  };

  if (
    addSubuserState.isError ||
    editSubuserState.isError ||
    deleteSubuserDataState.isError
  ) {
    console.log(
      addSubuserState.isError,
      editSubuserState.isError,
      deleteSubuserDataState.isError
    );
    return <Typography>Ошибка</Typography>;
  }

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar />
          <Box>
            {localEditting ? (
              <TextField
                value={localName}
                onChange={(e) => handler(e, setLocalName)}
                size="small"
                label="Имя"
                sx={{ display: "flex" }}
              />
            ) : (
              <Typography variant="h6" component="p">
                {localName}
              </Typography>
            )}
            {localEditting && edittableLogin ? (
              <TextField
                value={localLogin}
                onChange={(e) => handler(e, setLocalLogin)}
                size="small"
                label="Email"
                sx={{ mt: 2, display: "block" }}
              />
            ) : (
              <Typography sx={{ mt: 2 }}>{localLogin}</Typography>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        {localEditting ? (
          <MultipleSelectChip
            personName={personName}
            setPersonName={setPersonName}
          />
        ) : (
          <Typography>{personName.join(", ")}</Typography>
        )}
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "end" }}>
          {!localEditting ? (
            <IconButton onClick={() => setlocalEditting((prev) => !prev)}>
              <EditIcon />
            </IconButton>
          ) : (
            <Box>
              <IconButton
                onClick={() =>
                  setlocalEditting((prev) => {
                    setEdittableLogin(false);
                    dispatch(
                      updateSubData({
                        localName,
                        localLogin,
                        personName,
                        localEditting,
                        index,
                      })
                    );
                    handleAddSubuser();
                    return !prev;
                  })
                }
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={() =>
                  setlocalEditting((prev) => {
                    setLocalName(custom_name);
                    setLocalLogin(username);
                    setPersonName(
                      restaurants ? restaurants.map((rest) => rest.name) : []
                    );
                    return !prev;
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <IconButton onClick={handleDeleteSubuser}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
