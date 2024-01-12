import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const API_KEY ="08112023";
export const JSON_CONTENT_TYPE = "application/json";
export const API_BASE_URL ="/staging";

export const API_HEADER = {
    'Content-Type' : JSON_CONTENT_TYPE,
    'x-api-key' : API_KEY
} 

export const FORM_DATA_HEADER = {
    'x-api-key' : API_KEY,
    'Content-Type': 'multipart/form-data',
  }
  

  export const showSuccessToastMessage =(successMessage)=>{
    toast.success(successMessage);
    return null;
}
export const showErrorToastMessage = (errorMessage)=>{
    toast.error(errorMessage);
    return null;
}