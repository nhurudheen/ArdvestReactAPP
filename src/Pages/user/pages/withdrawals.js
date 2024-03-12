import { useEffect, useState } from "react";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import { SearchTable, filterTable } from "../../../Utils/utils";
import searchIcon from "../../../assets/icons/search.svg";
import Buttons from "../../../Components/buttons";
import { useUserBalanceSummary, useUserWithdrawalHistory } from "../userLayout/reusableEffects";
import comingSoonSvg from "../../../assets/icons/comingSoon.svg";
import eyeIcon from "../../../assets/icons/eyeFill.svg";
import pendingIcon from "../../../assets/icons/pending.svg";
import successIcon from "../../../assets/icons/success2.svg";
import rejectIcon from "../../../assets/icons/failed.svg";
import TransactionModal from "../../../Components/transactionModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setUserWithdrawalAccount, userDataSummary } from "../../../hooks/local/userReducer";
import Modal from "../../../Components/modals";
import SmallModal from "../../../Components/smallModal";
import InputWithLabel from "../../../Components/inputWithLabel";
import CurrencyInput from "../../../Components/currencyInput";
import PasswordInput from "../../../Components/passwordInput";

const Withdrawals = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Withdrawals");
        document.title = "Withdrawals | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userSessionData).userId;
    const userData = useSelector((state)=>state.user.userSummaryData);
    const userBalanceSummary = useUserBalanceSummary();
    const roiBalance = userBalanceSummary?.roiBalance? userBalanceSummary.roiBalance : '0.00'; 
    const [withdrawalAccountSetupModal, setWithdrawalAccountSetupModal] = useState(false);
    const [withdrawalModal, setWithdrawalModal] = useState(false);
    const withdrawalHistory =  useUserWithdrawalHistory(userId);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const updateBankAccount = useFormik({
        initialValues: {
            ...userData.userWithdrawalAccount
        },
        validationSchema : Yup.object({
            accountName : Yup.string().required("Account Name cannot be empty"),
            accountNumber: Yup.number().required("Account Number cannot be empty").typeError('Account Number can only be in Number'),
            bankName: Yup.string().required("Bank Name cannot be empty")
        }),
        onSubmit:async(values)=>{
            const {accountName, bankName, accountNumber} = values;

            let updateBankAccountData = {accountName,bankName,accountNumber,userId};
            const {payload} = await dispatch(setUserWithdrawalAccount(updateBankAccountData))
            if(payload.statusCode === "200"){
                await dispatch(userDataSummary(userId));
            }
        }
    })

    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-y-4 md:gap-0 mb-8 items-center">
                <NavigationHeader title={'All Withdrawals'} />
                <div className="md:justify-end md:flex">
                    <div className="flex items-center justify-center bg-[#f8f8f8] border rounded  col-span-1">
                        <div className="px-3">
                            <img src={searchIcon} alt="" />
                        </div>
                        <input type="search" id="searchInput" onInput={SearchTable} className="w-full p-2 bg-[#f8f8f8] text-sm active:outline-none focus:outline-none placeholder:text-xs" placeholder="Search Withdrawal..." />
                    </div>
                </div>
            </div>

            <div className="grid md:flex md:justify-between items-center gap-y-4">
                <div>
                <div className="mt-4 flex items-center gap-2">
                <label for="statusFilter" className="block text-sm font-medium">Showing :</label>
                <select id="statusFilter" onChange={()=>filterTable(6)} className="text-sm focus:outline-none focus:border-none ">
                    <option value="All">All Withdrawals</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
              </div>
                </div>
                <div className="grid md:flex md:justify-between gap-x-8 gap-y-4">
                    <Buttons btnText={'Make Withdrawal'} btnType={'primary'} onClick={()=>setWithdrawalModal(true)}/>
                    <Buttons btnText={`${updateBankAccount.values.accountName === "" ?'Create ' :' Update '}Withdrawal Account`} btnType={'secondary'} onClick={()=>setWithdrawalAccountSetupModal(true)}/>
                </div>

            </div>

            {
                withdrawalHistory.length > 0 ?
                    <div className="overflow-x-scroll mt-10">
                        <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                            <thead className="bg-[#EBFFEB]">
                                <tr>
                                    <th>S/N</th>
                                    <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Channel</p></th>
                                    <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Transaction Id</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount</p></th>
                                    <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                </tr>
                            </thead>

                            <tbody>
                                {withdrawalHistory.map((val, key) => {
                                    const statusColor= (val.status === "Approved") ? 'text-primary' : (val.status === "Pending") ? 'text-yellow-500' : 'text-red-500';
                                    return (
                                        <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedTransaction(val)}>
                                            <td className="px-3 py-4"><p>{key + 1}</p></td>
                                            <td className="px-6 py-4"><p className="truncate w-[180px]">{val.channel}</p></td>
                                            <td className="px-6 py-4"><p className="truncate w-[180px]">{val.transactionId}</p></td>
                                            <td className="px-3 py-4 "><p className="truncate w-[150px]">&#8358;{val.amount}</p></td>
                                            <td className="px-3 py-4 "><p className="truncate w-[100px]">{val.insertedDt}</p></td>
                                            <td className="px-3 py-4"><p className={`truncate w-[80px] font-medium ${statusColor}`}>{val.status}</p></td>
                                            <td className="px-3 py-4 hover:scale-105"><button onClick={() => setSelectedTransaction(val)}><img src={eyeIcon} alt="" /></button></td>
                                        </tr>

                                    )
                                }
                                )}
                                {
                                    selectedTransaction && (
                                        <TransactionModal isVisible={selectedTransaction !== null} onClose={() => setSelectedTransaction(null)}>
                                             <div className="rounded-xl overflow-hidden relative">
                                                <div className="w-full h-44 bg-slate-200 text-center flex items-center">
                                                    <div className="w-full">
                                                        <div className="w-full flex justify-center mb-4">
                                                        <img src={(selectedTransaction.status) === "Approved" ? successIcon : (selectedTransaction.status) === "Pending" ? pendingIcon : rejectIcon} alt="" />
                                                         
                                                        </div>
                                                        <p className="capitalize text-sm font-medium">{selectedTransaction.transactionType}</p>
                                                        <p className="text-2xl font-medium">&#8358;<span>{selectedTransaction.amount}</span></p>
                                                        <p className="text-xs">Transaction ID: <span>{selectedTransaction.transactionId}</span></p>
                                                    </div>
                                                </div>
                                                <div className="w-full h-44 bg-brandyellow flex items-center">
                                                    <div className="w-full px-3 text-xs grid gap-3">
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Account Name:</div>
                                                            <div className="font-bold text-right"><span className="mx-4">{selectedTransaction.accountName}</span></div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium pr-2">Account Number:</div>
                                                            <div className="font-bold text-right">{selectedTransaction.accountNumber}</div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Bank:</div>
                                                            <div className="font-bold text-right">{selectedTransaction.bank}</div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Status:</div>
                                                            <div className="font-bold text-right"><span>{selectedTransaction.status}</span></div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium pr-2">Message:</div>
                                                            <div className="font-bold text-right"><span>{selectedTransaction.message}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full h-full absolute top-0 flex items-center">
                                                    <div className="h-10 w-full flex justify-between">
                                                        <div className="h-10 w-5 rounded-r-full bg-white"></div>
                                                        <div className="h-10 w-5 rounded-l-full bg-white"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </TransactionModal>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    (
                        <div className="grid gap-4 my-16">
                            <div className="w-full grid justify-center">
                                <img src={comingSoonSvg} alt="" />
                            </div>
                            <p className="text-center text-lg font-semibold text-primary">No Withdrawals Available yet</p>
                        </div>
                    )
            }

            
            <Modal isVisible={withdrawalAccountSetupModal} onClose={()=>setWithdrawalAccountSetupModal(false)}>
            <p className="text-primary font-semibold text-xl">{updateBankAccount.values.accountName === "" ?'Create ' :' Update '}Withdrawal Account</p>
            <p className="text-ash_text_color font-light text-sm pb-4">Kindly Note that withdrawal will be made to this account:</p>
              <form className="grid grid-cols-1   gap-5" onSubmit={updateBankAccount.handleSubmit}>
                  <div className="grid grid-cols-1 gap-8">
                    <InputWithLabel labelName={'Account Name'}
                                    inputType={'text'}
                                    inputName={'accountName'}
                                    inputValue={updateBankAccount.values.accountName}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.accountName && updateBankAccount.touched.accountName ?  updateBankAccount.errors.accountName : null}
                                    />
                    <InputWithLabel labelName={'Account Number'}
                                    inputType={'text'}
                                    inputName={'accountNumber'}
                                    inputValue={updateBankAccount.values.accountNumber}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.accountNumber && updateBankAccount.touched.accountNumber ?  updateBankAccount.errors.accountNumber : null}/>
                    <InputWithLabel labelName={'Bank'}
                                    inputType={'text'}
                                    inputName={'bankName'}
                                    inputValue={updateBankAccount.values.bankName}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.bankName && updateBankAccount.touched.bankName ?  updateBankAccount.errors.bankName : null}/>  
                    <div>
                    <Buttons btnText={`Continue`} btnType={'primary'} type={'submit'}/>                 
                    </div> 
                  </div>
            </form>

            </Modal>
            
            <SmallModal isVisible={withdrawalModal} onClose={()=>setWithdrawalModal(false)}>
            <p className="text-primary font-semibold text-xl">Make Withdrawal</p>
            <p className="text-ash_text_color font-light text-sm pb-4">Kindly Note:</p>
            <ul>
                <li className="font-medium text-xs text-ash_header_color md:mr-12 mb-4 ms-4">That withdrawal will be made to the account you have submitted.</li>
                <li className="font-medium text-xs text-ash_header_color md:mr-12 ms-4">That your withdrawal will be made only from your ROI (Return On Investment) Balance</li>
            </ul>
            <span className="font-medium text-sm text-primary bg-[#E9FFE9] py-2 px-4 rounded-[54px] my-4 mr-16"><span className="font-bold">ROI Balance:</span> &#8358;{roiBalance}</span>
           
            <form className="grid gap-4">
                <CurrencyInput labelName={'Amount to withdraw'} 
                                inputType={'text'} />
                <PasswordInput labelName={'Transaction Pin'}
                            inputName={'transactionPin'}/>
                            {/* inputValue={changeUserTransactionPinForm.values.transactionPin}
                            inputOnBlur={changeUserTransactionPinForm.handleBlur}
                            inputOnChange={changeUserTransactionPinForm.handleChange}
                            inputError={changeUserTransactionPinForm.touched.transactionPin && changeUserTransactionPinForm.errors.transactionPin ? changeUserTransactionPinForm.errors.transactionPin : null}/> */}
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </form>
            </SmallModal>

        </div>
    );
}

export default Withdrawals;