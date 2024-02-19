import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { adminLogOut } from "../../../hooks/local/userReducer";
const AdminLogOut = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    useEffect(()=>{
        dispatch(adminLogOut());
    },[dispatch]);

    if(!isAuthenticated){
        return <Navigate to={'/admin'}/>
    }
    
}
 
export default AdminLogOut;