import  Axios from "axios";
import { API_BASE_URL, API_HEADER } from "../../Utils/constant";

export const APIClient = Axios.create(
    {
        baseURL : API_BASE_URL,
        headers : API_HEADER,
    }
)