import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminDashboardSummary, bankAccount, customerDataSummary, customerInvestmentList, customerList, deleteInvestmentType, investmentTypesInvestments, investmentTypesInvestors, listInvestmentType } from "../../../hooks/local/adminReducer";
import { useNavigate } from "react-router-dom";

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

export function useDeleteInvestmentType(investmentId){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return async (investmentId) => {
        try {
          const { payload } = await dispatch(deleteInvestmentType(investmentId));
          if (payload.statusCode === "200") {
            await dispatch(listInvestmentType());
            navigate("/management/investment");
          }
        } catch (error) {
          console.error(error);
        }
      };
}

export function useInvestmentTypeList(investmentId){
    const [investmentTypeDetails, setInvestmentTypeDetails] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getInvestmentDetails = async()=>{
            try{
                const { payload } = await dispatch(investmentTypesInvestments(investmentId));
                setInvestmentTypeDetails(payload.result)
            }
            catch(error){}
        }
        getInvestmentDetails();
    },[dispatch, investmentId]);
    return investmentTypeDetails;
}

export function useInvestmentTypeInvestors(investmentId){
    const [investors, setInvestors] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getInvestors = async()=>{
            try{
                const { payload } = await dispatch(investmentTypesInvestors(investmentId));
                setInvestors(payload.result)
            }
            catch(error){}
        }
        getInvestors();
    },[dispatch, investmentId]);
    return investors;
}
export function useGetBankDetails(){
    const [depositBankDetails, setDepositBankDetails] = useState([]);
      const dispatch = useDispatch();
      useEffect(()=>{
          const fetchBankDetails = async()=>{
              try{
                const { payload } = await dispatch(bankAccount());
                setDepositBankDetails(payload.result[0])
              }
              catch(error){}
          }
          fetchBankDetails();
        },[dispatch]);
      
      return depositBankDetails;
  }
  

