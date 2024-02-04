import { showErrorToastMessage } from "../../Utils/constant";
import { APIClient, APIFormDataClient } from "./apiClient";
export class APIService {
    static extractError(error) {
        let extracted;
        if (error.isAxiosError) {
            if (error.request) {
                extracted = ["Network Error Occurred"];
            }
            else if (error.response) {
                extracted = [error.response.message];
            }
            else {
                extracted = ["An Unexpected Error Occurred"];
            }
        }
        else {
            extracted = [error.response.message || "An unexpected Error occurred"];
        }
        extracted.forEach((error) => showErrorToastMessage(error))
    }

    static async userRegistration(registrationData) {
        try {
            return APIClient.post("/create_account", registrationData);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async verifyOTPEmailAddress(otpData) {
        try {
            return APIClient.post("/verify_email", otpData);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async userLogin(loginData) {
        try {
            return APIClient.post("/user_login", loginData);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async completeUserProfile(userProfileData) {
        try {
            return APIFormDataClient.post("/update_account", userProfileData);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);

        }
    }

    static async setUserTransactionPin(userPinData) {
        try {
            return APIClient.post("/set_user_pin", userPinData);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async forgotPassword(data) {
        try {
            return APIClient.post("/forget_password", data);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async resetPassword(data) {
        try {
            return APIClient.post("/reset_password", data);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async userBalance(userId) {
        try {
            return APIClient.get(`/user_balance_summary?userId=${userId}`);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async bankAccountDetails() {
        try {
            return APIClient.get("/bank_details");
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async userActiveInvestment(userId) {
        try {
            return APIClient.get(`/user_active_investment_list?userId=${userId}`);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async userTransactionHistory(userId) {
        try {
            return APIClient.get(`/user_transactions?userId=${userId}`);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async userInvestments(userId) {
             try {
            return APIClient.get(`/user_investment_list?userId=${userId}`);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }
    static async userSummary(userId) {
        try {
            return APIClient.get(`/single_user_data?userId=${userId}`);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }

    static async updateUserWithdrawalAccount(data) {
        try {
            return APIClient.post("/set_withdrawal_account", data);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }
    static async updateUserPassword(data) {
        try {
            return APIClient.post("/update_user_password", data);
        }
        catch (error) {
            APIService.extractError(error);
            throw (error);
        }
    }
}
