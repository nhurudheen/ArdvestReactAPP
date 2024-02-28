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
    "adminSessionData",
    "investmentTypes"
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

export const customerList = createAsyncThunk(
    "admin/CustomerList",
    async()=>{
        const apiCustomerList = await APIService.getCustomerList();
        const response = await apiCustomerList.data;
        return response;
    }
)
export const customerDataSummary = createAsyncThunk(
    "admin/CustomerData",
    async(userId)=>{
        const apiUserDataSummary  = await APIService.userSummary(userId);
        const response = apiUserDataSummary.data;
        return response;
    }
)
export const customerInvestmentList = createAsyncThunk(
    "admin/CustomerInvestment",
    async(userId)=>{
        const apiInvestmentList = await APIService.userInvestments(userId);
        const response = apiInvestmentList.data;
        return response;
    }
)

export const listInvestmentType = createAsyncThunk(
    "admin/LisInvestmentType",
    async()=>{
        const apiInvestmentTypeList = await APIService.investmentTypeList();
        const response = apiInvestmentTypeList.data;
        saveToLocalStorage("investmentTypes", JSON.stringify(response.result));
        return response;
    }
)

export const createNewInvestmentType = createAsyncThunk(
    "admin/addNewInvestmentType",
    async(data)=>{
        const apiAddNewInvestmentType = await APIService.createNewInvestmentType(data);
        const response = apiAddNewInvestmentType.data;
        return response;
    }
)

export const deleteInvestmentType = createAsyncThunk(
    "admin/deleteInvestmentType",
    async(data)=>{
        const apiDeleteInvestmentType = await APIService.deleteInvestmentType(data);
        const response = apiDeleteInvestmentType.data;
        return response;
    }
)
export const investmentTypesInvestments = createAsyncThunk(
    "admin/InvestmentTypesInvestments",
    async(investmentTypeId)=>{
        const apiGetInvestmentTypes = await APIService.investmentTypeDetails(investmentTypeId);
        const response = apiGetInvestmentTypes.data;
        return response;
    }
)

export const investmentTypesInvestors = createAsyncThunk(
    "admin/InvestmentTypesInvestors",
    async(investmentTypeId)=>{
        const apiGetInvestmentInvestor = await APIService.investmentTypeInvestor(investmentTypeId);
        const response = apiGetInvestmentInvestor.data;
        return response;
    }
)
export const addNewInvestment= createAsyncThunk(
    "admin/addInvestmentType",
    async(data)=>{
        const apiAddNewInvestment = await APIService.addInvestmentTypes(data);
        const response = apiAddNewInvestment.data;
        return response;
    }
)

export const updateAdminPassword= createAsyncThunk(
    "admin/updateAdminPassword",
    async(data)=>{
        const apiChangeAdminPassword = await APIService.changeAdminPassword(data);
        const response = apiChangeAdminPassword.data;
        return response;
    }
)
export const updateAdminTransactionPin = createAsyncThunk(
    "admin/updateAdminTransactionPin",
    async(data)=>{
        const apiChangeAdminTransactionPin = await APIService.changeAdminTransactionPin(data);
        const response = apiChangeAdminTransactionPin.data;
        return response;
    }
)
const logOutSession = () =>{
    sessionStorage.removeItem("adminSessionData");
    sessionStorage.removeItem("investmentTypes");
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
        .addCase(customerList.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addCase(customerDataSummary.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addCase(customerInvestmentList.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addCase(listInvestmentType.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                state.investmentTypes = action.payload.result;
            }
            state.loading = false;
        })
        .addCase(createNewInvestmentType.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading =false;
        })
        .addCase(deleteInvestmentType.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading =false;
        })
        .addCase(investmentTypesInvestments.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addCase(investmentTypesInvestors.fulfilled, (state, action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
            }
            state.loading = false;
        })
        .addCase(addNewInvestment.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false;
        })
        .addCase(updateAdminPassword.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false;
        })
        .addCase(updateAdminTransactionPin.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.administrative = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                state.error = action.payload.message;
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false;
        })
        .addMatcher(isAnyOf(
            auth.pending,
            adminDashboardSummary.pending,
            customerList.pending,
            customerDataSummary.pending,
            customerInvestmentList.pending,
            listInvestmentType.pending,
            createNewInvestmentType.pending,
            deleteInvestmentType.pending,
            investmentTypesInvestments.pending,
            investmentTypesInvestors.pending,
            addNewInvestment.pending,
            updateAdminPassword.pending,
            updateAdminTransactionPin.pending
        ), 
        (state)=>{
            state.loading = true;
            state.administrative = null;
            state.error = null;
        })
        .addMatcher(
            isAnyOf(
                adminDashboardSummary.rejected,
                customerList.rejected,
                customerDataSummary.rejected,
                customerInvestmentList.rejected,
                listInvestmentType.rejected,
                createNewInvestmentType.rejected,
                deleteInvestmentType.rejected,
                investmentTypesInvestments.rejected,
                investmentTypesInvestors.rejected,
                addNewInvestment.rejected,
                updateAdminPassword.rejected,
                updateAdminTransactionPin.rejected
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