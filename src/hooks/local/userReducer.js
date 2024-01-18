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

export const userAuthenticate = createAsyncThunk(
    "user/userLogin",
    async(userData) =>{
        const apiClientUserLogin = await APIService.userLogin(userData);
        const response = await apiClientUserLogin.data;
        return response;
    }
)

export const userCompleteProfile = createAsyncThunk(
    "user/completeProfileData",
    async(userProfileData)=>{
        const apiClientProfileData = await APIService.userCompleteProfile(userProfileData);
        const response = await apiClientProfileData.data;
        return response;
    }
)

const userSlice = createSlice({
    name: "user",
    reducers : {},
    initialState : initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(userAuthenticate.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){

            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading= false;
        })
        .addCase(userAuthenticate.rejected, (state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = showErrorToastMessage("Server Down, Contact Admin");
        })

        .addMatcher(isAnyOf(
            userRegistration.fulfilled,
            verifyEmailAddress.fulfilled,
            userCompleteProfile.fulfilled
        ), (state,action)=>{
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
            verifyEmailAddress.pending,
            userAuthenticate.pending,
            userCompleteProfile.pending
        ), 
        (state)=>{
            state.loading = true;
            state.users = null;
            state.error = null;
        })
        .addMatcher(isAnyOf(
            userRegistration.rejected,
            verifyEmailAddress.rejected,
            userCompleteProfile.rejected
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