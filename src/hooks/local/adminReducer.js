import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getPeriodOfDay } from "../../Utils/utils";
import { retrieveFromLocalStorage, showErrorToastMessage, showSuccessToastMessage} from "../../Utils/constant";
import { APIService } from "../remote/apiServices";

const initialState = {
    administrative : null,
    loading: false,
    error: null,
    isAuthenticated: false,
 ...retrieveFromLocalStorage([
    "adminSessionData"
 ])
}
    
const periodOfTheDay = getPeriodOfDay();

const saveToLocalStorage = (key, data)=>{
    sessionStorage.setItem(key,data);
}

export const auth = createAsyncThunk(
    "admin/auth",
    async(data)=>{
        const apiAdminAuth = await APIService.adminAuthentication(data);
        const response = await apiAdminAuth.data;
        saveToLocalStorage("adminSessionData", JSON.stringify(response.result));
        return response;
    }
)
export const adminDashboardSummary = createAsyncThunk(
    "admin/dashboardSummary",
    async()=>{
        const apiAdminDashboard = await APIService.adminDashboard();
        const response = await apiAdminDashboard.data;
        return response;
    }
)

const logOutSession = () =>{
    sessionStorage.removeItem("adminSessionData");
}

export const logout = createAsyncThunk(
    "admin/logout",
    async()=>{
        logOutSession();
    }
)

const administrativeSlice = createSlice({
    name: "admin",
    reducers : {},
    initialState : initialState,
    extraReducers : (builder)=>{
        builder
        .addCase(auth.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;       
                state.isAuthenticated = true;
                state.adminSessionData = action.payload.result;
                showSuccessToastMessage(`Good ${periodOfTheDay} `+action.payload.result.firstName);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading= false;
        })
        .addCase(auth.rejected, (state,action)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.error = showErrorToastMessage("Server Down, Contact Admin");
        })
        .addCase(logout.fulfilled, (state)=>{
            state.isAuthenticated = false;
            state.loading = false;
            state.administrative = null;
        })
        .addCase(adminDashboardSummary.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addMatcher(isAnyOf(
            auth.pending,
            adminDashboardSummary.pending
        ), 
        (state)=>{
            state.loading = true;
            state.administrative = null;
            state.error = null;
        })
        .addMatcher(
            isAnyOf(
                adminDashboardSummary.rejected
            ),
            (state,action)=>{
                state.loading = false;
                state.users = null;
                state.error = showErrorToastMessage(action.error.message);
            }
            )
        }
    })
    export const adminReducer = administrativeSlice.reducer;