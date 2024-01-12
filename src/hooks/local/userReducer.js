import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APIService } from "../remote/apiServices"

const initialState = {
    users : null,
    loading : false,
    error : null,
    isAuthenticated :  false,
}

export const userRegistration = createAsyncThunk(
    "user/registration",
    async(registrationData) =>{
        const apiClientRegistration = await APIService.userRegistration(registrationData);
        const response = await apiClientRegistration.data;
        return response;
    }
)

const userSlice = createSlice({
    name: "user",
    reducers : {},
    initialState : initialState
})
export const userReducer = userSlice.reducer;