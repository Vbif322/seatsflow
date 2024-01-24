import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        destroyCookie(null, "token");
        localStorage.clear();
        window.location.reload();
      }
    }

    return next(action);
  };
