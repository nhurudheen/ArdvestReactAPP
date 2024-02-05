import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { APIService } from "../remote/apiServices"
import { retrieveFromLocalStorage, showErrorToastMessage, showSuccessToastMessage } from "../../Utils/constant";
import { getPeriodOfDay } from "../../Utils/utils";

const initialState = {
    users : null,
    loading : false,
    error : null,
    isAuthenticated :  false,
    ...retrieveFromLocalStorage([
        "userSessionData",
        "userInvestmentList",
        "userSummaryData"
    ])
}
const periodOfTheDay = getPeriodOfDay();

const saveToLocalStorage = (key, data)=>{
    sessionStorage.setItem(key,data);
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
        saveToLocalStorage("userSessionData", JSON.stringify(response.result));
        return response;
    }
)

export const userCompleteProfile = createAsyncThunk(
    "user/completeProfileData",
    async(userProfileData)=>{
        const apiClientProfileData = await APIService.completeUserProfile(userProfileData);
        const response = await apiClientProfileData.data;
        return response;
    }
)

export const userTransactionPin = createAsyncThunk(
    "user/setTransactionPin",//Action Type definiton of Redux
    async(pinData)=>{
        const apiCLientSetTransactionPin = await APIService.setUserTransactionPin(pinData);
        const response = await apiCLientSetTransactionPin.data;
        return response;
    }
)

export const userForgotPassword = createAsyncThunk(
    "user/ForgotPassword",
    async(data)=>{
        const apiCLientForgotPassword = await APIService.forgotPassword(data);
        const response = await apiCLientForgotPassword.data;
        return response;
    }
)
export const userResetPassword = createAsyncThunk(
    "user/ResetPassword",
    async(data)=>{
        const apiClientResetPassword = await APIService.resetPassword(data);
        const response = await apiClientResetPassword.data;
        return response;
    }
)

export const userBalanceSummary = createAsyncThunk(
    "user/BalanceSummary",
    async(userId)=>{
        const apiUserBalanceSummary = await APIService.userBalance(userId);
        const response = await apiUserBalanceSummary.data;
        return response;
    }
)

export const depositBankAccount = createAsyncThunk(
    "user/BankAccountForDeposit",
    async()=>{
        const apiBankAccount = await APIService.bankAccountDetails();
        const response = await apiBankAccount.data;
        return response;
    }
)

export const userActiveInvestmentList = createAsyncThunk(
    "user/ActiveInvestment",
    async(userId)=>{
        const apiActiveInvestment = await APIService.userActiveInvestment(userId);
        const response = apiActiveInvestment.data;
        return response;
    }
)
export const userTransactionHistory = createAsyncThunk(
    "user/TransactionHistory",
    async(userId)=>{
        const apiTransactionHistory = await APIService.userTransactionHistory(userId);
        const response = apiTransactionHistory.data;
        return response;
    }
)
export const userInvestmentList = createAsyncThunk(
    "user/InvestmentList",
    async(userId)=>{
        const apiInvestmentList = await APIService.userInvestments(userId);
        const response = apiInvestmentList.data;
        saveToLocalStorage("userInvestmentList", JSON.stringify(response.result));
        return response;
    }
)
export const userDataSummary = createAsyncThunk(
    "user/Summary",
    async(userId)=>{
        const apiUserDataSummary  = await APIService.userSummary(userId);
        const response = apiUserDataSummary.data;
        saveToLocalStorage("userSummaryData", JSON.stringify(response.result));
        return response;
    }
)
export const setUserWithdrawalAccount = createAsyncThunk(
    "user/SetUserWithdrawalAccount",
    async(data)=>{
        const apiSetUserWIthdrawalAccount = await APIService.updateUserWithdrawalAccount(data);
        const response = apiSetUserWIthdrawalAccount.data;
        return response;
    }
)

export const changeUserPassword = createAsyncThunk(
    "user/changeUserPassword",
    async(data)=>{
        const apiChangeUserPassword = await APIService.updateUserPassword(data);
        const response = apiChangeUserPassword.data;
        return response;
    }
)

export const changeUserTransactionPin = createAsyncThunk(
    "user/changeUserTransactionPin",
    async(data)=>{
        const apiChangeUserTransactionPin = await APIService.updateUserTransactionPin(data);
        const response = apiChangeUserTransactionPin.data;
        return response;
    }
)
export const bankDepositAddFund = createAsyncThunk(
    "user/AddFundBankDeposit",
    async(data)=>{
        const apiAddFunds = await APIService.userAddFund(data);
        const response = apiAddFunds.data;
        return response;
    }
)
const logOutSession = () =>{
    sessionStorage.removeItem("users");
    sessionStorage.removeItem("userSessionData"); 
    sessionStorage.removeItem("userInvestmentList");
    sessionStorage.removeItem("userSummaryData")
}
export const userLogOut = createAsyncThunk(
    "user/LogOut",
    async()=>{
        logOutSession();
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
                state.users = action.payload;
                state.isAuthenticated = true;
                state.userSessionData = action.payload.result;
                showSuccessToastMessage(`Good ${periodOfTheDay} `+action.payload.result.firstname);
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
        .addCase(userLogOut.fulfilled , (state)=>{
            state.isAuthenticated = false;
            state.loading = false;
            state.users = null;
        })
        .addCase(userBalanceSummary.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(depositBankAccount.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(userActiveInvestmentList.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(userTransactionHistory.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(userInvestmentList.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                state.userInvestmentList = action.payload.result;
            }
            state.loading = false
        })
        .addCase(userDataSummary.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                state.userSummaryData = action.payload.result;
            }
            state.loading = false
        })
        .addCase(setUserWithdrawalAccount.fulfilled,(state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                showErrorToastMessage(action.payload.message);
            }
            state.loading = false
        })
        .addCase(changeUserPassword.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                showErrorToastMessage(action.payload.message)
            }
            state.loading= false;
        })
        .addCase(changeUserTransactionPin.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                showErrorToastMessage(action.payload.message)
            }
            state.loading= false;
        })
        .addCase(bankDepositAddFund.fulfilled, (state,action)=>{
            if(action.payload.statusCode === "200"){
                state.users = action.payload;
                showSuccessToastMessage(action.payload.message);
            }
            else{
                showErrorToastMessage(action.payload.message)
            }
            state.loading= false;
        })
        .addMatcher(isAnyOf(
            userRegistration.fulfilled,
            verifyEmailAddress.fulfilled,
            userCompleteProfile.fulfilled,
            userTransactionPin.fulfilled,
            userForgotPassword.fulfilled,
            userResetPassword.fulfilled,
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
            userCompleteProfile.pending,
            userTransactionPin.pending,
            userForgotPassword.pending,
            userResetPassword.pending,
            userBalanceSummary.pending,
            depositBankAccount.pending,
            userActiveInvestmentList.pending,
            userTransactionHistory.pending,
            userInvestmentList.pending,
            userDataSummary.pending,
            setUserWithdrawalAccount.pending,
            changeUserPassword.pending,
            changeUserTransactionPin.pending,
            bankDepositAddFund.pending
        ), 
        (state)=>{
            state.loading = true;
            state.users = null;
            state.error = null;
        })
        .addMatcher(isAnyOf(
            userRegistration.rejected,
            verifyEmailAddress.rejected,
            userCompleteProfile.rejected,
            userTransactionPin.rejected,
            userForgotPassword.rejected,
            userResetPassword.rejected,
            userBalanceSummary.rejected,
            depositBankAccount.rejected,
            userActiveInvestmentList.rejected,
            userTransactionHistory.rejected,
            userInvestmentList.rejected,
            userDataSummary.rejected,
            setUserWithdrawalAccount.rejected,
            changeUserPassword.rejected,
            changeUserTransactionPin.rejected,
            bankDepositAddFund.rejected
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