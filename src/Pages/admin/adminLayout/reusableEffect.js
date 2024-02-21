import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminDashboardSummary } from "../../../hooks/local/adminReducer";

export function useDashboardSummary (){
    const [dashboardSummary, setDashboardSummary] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getAdminDashboardSummary = async()=>{
            try{
                const { payload } = await dispatch(adminDashboardSummary());
                setDashboardSummary(payload.result)
            }
            catch(error){}
        }
        getAdminDashboardSummary();
    },[dispatch])
    return dashboardSummary;
}