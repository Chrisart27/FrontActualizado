import { configureStore } from "@reduxjs/toolkit";
import client from "./slices/client";
export const store = configureStore({
    reducer: {
        client,
    },
});

export default store.dispatch;