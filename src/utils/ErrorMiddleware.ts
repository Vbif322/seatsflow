import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.log("We got a rejected action!");
      if (action.payload.error === "Неверный токен") {
        alert(action.payload.error);
        destroyCookie(null, "token");
        localStorage.clear();
      }
    }

    return next(action);
  };
