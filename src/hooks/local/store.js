import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import { adminReducer } from "./adminReducer";

const store = configureStore({
    reducer :{
        user: userReducer,
        admin: adminReducer
    },
    devTools : true
});
export default store;