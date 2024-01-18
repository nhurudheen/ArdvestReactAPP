import { showErrorToastMessage } from "../../Utils/constant";
import { APIClient, APIFormDataCleint } from "./apiClient";

export class APIService{
    static extractError(error){
        let extracted;
        if(error.isAxiosError){
            if(error.request){
                extracted = ["Network Error Occurred"];
            }
            else if(error.response){
                extracted = [error.response.message];
            }
            else{
                extracted = ["An Unexpected Error Occurred"];
            }
        }
        else{
            extracted = [error.response.message || "An unexpected Error occurred"];
        }
        extracted.forEach((error)=>showErrorToastMessage(error))
    }

    static async userRegistration(registrationData){
        try{
            return APIClient.post("/create_account", registrationData);
        }
        catch(error){
            APIService.extractError(error);
            throw(error);
        }
    }

    static async verifyOTPEmailAddress(otpData){
        try{
            return APIClient.post("/verify_email", otpData);
        }
        catch(error){
            APIService.extractError(error);
            throw(error);
        }
    }

    static async userLogin(loginData){
        try{
            return APIClient.post("/user_login", loginData);
        }
        catch(error){
            APIService.extractError(error);
            throw(error);
        }
    }

    static async completeUserProfile(userProfileData){
        try{
            return APIFormDataCleint.post("/update_account", userProfileData);
        }
        catch(error){
            APIService.extractError(error);
            throw(error);
        }
    }
}
