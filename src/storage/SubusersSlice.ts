import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subusers: [],
  error: null,
};

const subusersSlice = createSlice({
  name: "subusers",
  initialState,
  reducers: {
    resetSubusers: (state) => {
      state.subusers = [];
      state.error = null;
    },
    setSubusersData : (state, action) => {
      state.subusers = action.payload.data.inheritors
      state.error = action.payload.error === undefined ? null : action.payload.error
    },
    updateSubData : (state, action) => {
      state.subusers[action.payload.index]["custom_name"] = action.payload.localName
      state.subusers[action.payload.index]["username"] = action.payload.localLogin
      state.subusers[action.payload.index]["restaurants"] = action.payload.personName.map(rest=>{
        return {'name': rest}
      })
    },
    addSubuser: (state) => {
      state.subusers = [...state.subusers, {
        custom_name: "",
        username: "",
        restaurants: [],
        editting: true,
      }]
    },
    deleteSubuser: (state, action) => {
      state.subusers = state.subusers.filter((sub, i) => i !== action.payload)
    }
  }
});

export const { resetSubusers, setSubusersData, updateSubData, addSubuser, deleteSubuser } = subusersSlice.actions;

export default subusersSlice.reducer;
