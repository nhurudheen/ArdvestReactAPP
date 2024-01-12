import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { APIService } from "../remote/apiServices"
import { showErrorToastMessage, showSuccessToastMessage } from "../../Utils/constant";

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

export const verifyEmailAddress = createAsyncThunk(
    "user/verifyEmailAddress",
    async(otpData) =>{
        const apiClientVerifyEmailAddress = await APIService.verifyOTPEmailAddress(otpData);
        const response = await apiClientVerifyEmailAddress.data;
        return response;
    }
)

const userSlice = createSlice({
    name: "user",
    reducers : {},
    initialState : initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(userRegistration.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else if(action.payload.statusCode === "400"){
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false;
        })
        .addCase(verifyEmailAddress.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else if(action.payload.statusCode === "400"){
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false;
        })
        .addMatcher(isAnyOf(
            userRegistration.pending,
            verifyEmailAddress.pending
        ), 
        (state)=>{
            state.loading = true;
            state.users = null;
            state.error = null;
        }
        )
        .addMatcher(isAnyOf(
            userRegistration.rejected,
            verifyEmailAddress.rejected
        ),
        (state,action)=>{
            state.loading = false;
            state.users = null;
            state.error = showErrorToastMessage(action.error.message);
        }
        )
    }
})
export const userReducer = userSlice.reducer;