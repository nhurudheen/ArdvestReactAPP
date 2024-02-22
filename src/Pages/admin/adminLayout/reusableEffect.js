import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminDashboardSummary, customerDataSummary, customerInvestmentList, customerList } from "../../../hooks/local/adminReducer";

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

export function useCustomerList(){
    const [listOfCustomer, setListOfCustomer] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCustomerList = async()=>{
            try{
                const { payload } = await dispatch(customerList());
                setListOfCustomer(payload.result)
            }
            catch(error){}
        }
        getCustomerList();
    },[dispatch])
    return listOfCustomer;
}
export function useCustomerDataSummary(userId){
    const [customerData, setCustomerData] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCustomerData = async ()=>{
            try{
                const { payload } = await dispatch(customerDataSummary(userId));
                setCustomerData(payload.result)
            }
            catch(error){}
        }
        getCustomerData();
    },[dispatch,userId])
    return customerData;
}


export function useCustomerInvestmentList(userId){
    const [investmentData, setInvestmentData] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCustomerInvestmentData = async()=>{
            try{
                const {payload } = await dispatch(customerInvestmentList(userId));
                setInvestmentData(payload.result)
            }
            catch(error){}
        }
        getCustomerInvestmentData();
    }, [dispatch, userId])

    return investmentData;
}
