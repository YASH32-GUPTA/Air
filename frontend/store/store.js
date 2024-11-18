    import { configureStore } from "@reduxjs/toolkit";
    import toolkit from "../features/toolkit.js";

    export const Store = configureStore({
        reducer : {
            toolkit : toolkit 
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
              serializableCheck: false,
        }),
    });