import  Axios from "axios";
import { API_BASE_URL, API_HEADER, FORM_DATA_HEADER } from "../../Utils/constant";

export const APIClient = Axios.create(
    {
        baseURL : API_BASE_URL,
        headers : API_HEADER,
    }
)

export const APIFormDataCleint = Axios.create(
    {
        baseURL : API_BASE_URL,
        headers : FORM_DATA_HEADER
    }
)