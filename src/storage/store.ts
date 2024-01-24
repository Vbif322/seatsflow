import {
  Action,
  AsyncThunkAction,
  ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import tokenSlice from "./user/tokenSlice";
import restSlice from "./restSlice";
import bookingSlice from "./bookingSlice";
import { api } from "../storage/api/api";
import SubusersSlice from "./SubusersSlice";
import classApi from "../api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { rtkQueryErrorLogger } from "@/utils/ErrorMiddleware";
import alertSlice from "./alertSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      token: tokenSlice,
      rest: restSlice,
      booking: bookingSlice,
      subusers: SubusersSlice,
      alert: alertSlice,
      [api.reducerPath]: api.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: classApi,
        },
      }).concat(api.middleware, rtkQueryErrorLogger),
  });

export const store = createStore();

export type ReduxDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const useDispatch = () => useReduxDispatch<any>();
export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

setupListeners(store.dispatch);

export const wrapper = createWrapper<AppStore>(createStore);
