import React, { useEffect } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import { appBarHeight, drawerWidth } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setAuth } from "@/storage/user/tokenSlice";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuth());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={`${montserrat.className}`}>
        <Box sx={{ ml: `${drawerWidth}px`, mt: `${appBarHeight}px` }}>
          {children}
        </Box>
      </main>
    </>
  );
}
