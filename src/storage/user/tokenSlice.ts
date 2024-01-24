import { restaurant, UserInfo } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { destroyCookie } from "nookies";

export const fetchFullData = createAsyncThunk(
  "token/fetchFullData",
  async (
    token: any,
    {
      rejectWithValue,
      fulfillWithValue,
      extra: api,
    }: { rejectWithValue: any; fulfillWithValue: any; extra: any }
  ) => {
    try {
      const data = await api.getFullData(token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type InitialState = {
  loading: boolean;
  error: any;
  token: string;
  message: string;
  chosenRestID: number;
  chosenRest: restaurant;
  restaurants: any[];
  granted_restaurants: any[];
  userInfo: UserInfo;
};

const initialState: InitialState = {
  loading: true,
  error: null,
  token: "",
  message: "",
  chosenRestID: 0,
  chosenRest: {},
  restaurants: [],
  granted_restaurants: [],
  userInfo: {},
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem(
        "restaurants",
        JSON.stringify(action.payload.restaurants)
      );
      localStorage.setItem(
        "granted_restaurants",
        JSON.stringify(action.payload.granted_restaurants)
      );
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
      localStorage.setItem("chosenRestID", "0");
      if (action.payload.restaurants.length < 1) {
        localStorage.setItem("chosenRest", JSON.stringify({}));
      } else {
        localStorage.setItem(
          "chosenRest",
          JSON.stringify(action.payload.restaurants[0])
        );
      }

      return {
        ...initialState,
        ...action.payload,
        chosenRest:
          action.payload.restaurants[0] ||
          action.payload.granted_restaurants[0] ||
          {},
      };
    },
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("restaurants");
      localStorage.removeItem("granted_restaurants");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("chosenRestID");
      localStorage.removeItem("chosenRest");
      destroyCookie(null, "token");
      return initialState;
    },
    resetError: (state) => {
      state.error = null;
    },
    setAuth: (state) => {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.restaurants = JSON.parse(localStorage.getItem("restaurants"));
        state.granted_restaurants = JSON.parse(
          localStorage.getItem("granted_restaurants")
        );
        state.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        state.chosenRestID = Number(localStorage.getItem("chosenRestID"));
        state.chosenRest =
          localStorage.getItem("chosenRest") === "undefined"
            ? {}
            : JSON.parse(localStorage.getItem("chosenRest"));
        state.message = "restore token";
        state.loading = false;
      }
    },
    changeRest: (state, action) => {
      state.chosenRestID = action.payload.id;
      localStorage.setItem("chosenRestID", action.payload.id);
      if (action.payload.granted) {
        state.chosenRest = state.granted_restaurants[action.payload.id];
        localStorage.setItem(
          "chosenRest",
          JSON.stringify(state.granted_restaurants[action.payload.id])
        );
      } else {
        state.chosenRest = state.restaurants[action.payload.id];
        localStorage.setItem(
          "chosenRest",
          JSON.stringify(state.restaurants[action.payload.id])
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullData.fulfilled, (state: any, action: any) => {
        state.granted_restaurants = action.payload.granted_restaurants;
        state.restaurants = action.payload.restaurants;
        state.userInfo = action.payload.userInfo;
        if (localStorage.getItem("chosenRest") === "undefined") {
          if (action.payload.restaurants[state.chosenRestID]) {
            console.log(action.payload.restaurants[state.chosenRestID]);
            state.chosenRest = action.payload.restaurants[state.chosenRestID];
          } else {
            state.chosenRest = {};
          }
        } else {
          state.chosenRest = JSON.parse(localStorage.getItem("chosenRest"));
        }
        localStorage.setItem(
          "restaurants",
          JSON.stringify(action.payload.restaurants)
        );
        localStorage.setItem(
          "granted_restaurants",
          JSON.stringify(action.payload.granted_restaurants)
        );
        localStorage.setItem(
          "userInfo",
          JSON.stringify(action.payload.userInfo)
        );
        if (action.payload.restaurants.length) {
          localStorage.setItem(
            "chosenRest",
            JSON.stringify(action.payload.restaurants[state.chosenRestID])
          );
        } else if (action.payload.granted_restaurants.length) {
          localStorage.setItem(
            "chosenRest",
            JSON.stringify(action.payload.granted_restaurants[0])
          );
        }
      })
      .addCase(HYDRATE, (state: any, action: any) => {
        return {
          ...state,
          ...action.payload.token,
        };
      })
      .addMatcher(
        (action) => action.type.endsWith("rejected"),
        (state, action) => {
          // if (action.payload?.error === "Неверный токен") {
          //   localStorage.removeItem("token");
          //   localStorage.removeItem("restaurants");
          //   localStorage.removeItem("granted_restaurants");
          //   localStorage.removeItem("userInfo");
          //   localStorage.removeItem("chosenRestID");
          //   localStorage.removeItem("chosenRest");
          //   destroyCookie(null, "token");
          //   return initialState;
          // }
        }
      );
  },
});

export const { logout, setAuth, changeRest, resetError, setUserData } =
  tokenSlice.actions;

export default tokenSlice.reducer;
