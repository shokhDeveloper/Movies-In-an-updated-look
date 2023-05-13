import { configureStore } from "@reduxjs/toolkit";
import { Root } from "./root";

export const store = configureStore({
    devTools: process.env.NODE_ENV === "development" ? true : false,
    reducer: Root
})