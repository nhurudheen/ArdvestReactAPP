import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { depositBankAccount, userActiveInvestmentList } from "../../../hooks/local/userReducer";

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