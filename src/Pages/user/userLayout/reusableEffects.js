import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { depositBankAccount, investmentTypesInvestments, investmentTypesList, singleInvestment, userActiveInvestmentList, userBalanceSummary, userInvestmentList, userTransactionHistory, userWithdrawalList } from "../../../hooks/local/userReducer";

export function useDepositBankList(){
  const [depositBankDetails, setDepositBankDetails] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchBankDetails = async()=>{
            try{
              const { payload } = await dispatch(depositBankAccount());
              setDepositBankDetails(payload.result[0])
            }
            catch(error){}
        }
        fetchBankDetails();
      },[dispatch]);
    
    return depositBankDetails;
}

export function useUserBalanceSummary(){
    const [balanceSummary, setBalanceSummary] = useState([]);
    const userId = useSelector((state)=>state.user.userSessionData).userId;
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUserBalanceSummary = async()=>{
            try{
                const { payload } = await dispatch(userBalanceSummary(userId));
                setBalanceSummary(payload.result)
            }
            catch(error){}
        }
        getUserBalanceSummary();
    },[dispatch, userId]);
    return balanceSummary;
}

export function useUserActiveInvestmentList(){
    const [activeInvestmentList, setActiveInvestmentList] = useState([]);
    const userId = useSelector((state)=>state.user.userSessionData).userId;
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUserActiveInvestment = async()=>{
            try{
                const { payload } = await dispatch(userActiveInvestmentList(userId));
                setActiveInvestmentList(payload.result)
            }
            catch(error){}
        }
        getUserActiveInvestment();
    },[dispatch, userId]);
    return activeInvestmentList;
}

export function useUserTransactionHistory(){
    const [transactionList, setTransactionList] = useState([]);
    const userId = useSelector((state)=>state.user.userSessionData).userId;
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUserTransaction = async()=>{
            try{
                const { payload } = await dispatch(userTransactionHistory(userId));
                setTransactionList(payload.result)
            }
            catch(error){}
        }
        getUserTransaction();
    },[dispatch, userId]);
    return transactionList;
}

export function useUserInvestmentList(){
    const [investmentList, setInvestmentList] = useState([]);
    const userId = useSelector((state)=>state.user.userSessionData).userId;
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUserInvestment = async()=>{
            try{
                const { payload } = await dispatch(userInvestmentList(userId));
                setInvestmentList(payload.result);
            }
            catch(error){}
        }
        getUserInvestment();
    },[dispatch, userId]);

    return investmentList;
}

export function useInvestmentTypes(){
    const [investmentTypeList, setInvestmentTypeList] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getInvestmentTypes = async()=>{
            try{
                const { payload } = await dispatch(investmentTypesList());
                setInvestmentTypeList(payload.result)
            }
            catch(error){}
        }
        getInvestmentTypes();
    },[dispatch]);
    return investmentTypeList;
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

export function useSingleInvestmentDetails(investmentId){
    const [investmentData, setInvestmentData] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getInvestmentDetails = async()=>{
            try{
                const {payload} = await dispatch(singleInvestment(investmentId));
                setInvestmentData(payload.result);
            }
            catch(error){};
        }
        getInvestmentDetails();
    },[dispatch,investmentId]);

    return investmentData;

}

export function useUserWithdrawalHistory(userId){
    const [withdrawalHistory, setWithdrawalHistory] =useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        const getUserWithdrawals = async()=>{
            try{
                const {payload} = await dispatch(userWithdrawalList(userId));
                setWithdrawalHistory(payload.result);
            }
            catch(error){}
        }
        getUserWithdrawals();
    }, [dispatch,userId]);
    return withdrawalHistory;
}

