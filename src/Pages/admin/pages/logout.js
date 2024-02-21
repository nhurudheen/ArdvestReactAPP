import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../../hooks/local/adminReducer";
const AdminLogOut = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=>state.admin.isAuthenticated);
    useEffect(()=>{
        dispatch(logout());
    },[dispatch]);

    if(!isAuthenticated){
        return <Navigate to={'/admin'}/>
    }
    
}
 
export default AdminLogOut;