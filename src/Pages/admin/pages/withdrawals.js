import { useEffect, useState } from "react";
import { useWithdrawalRequest } from "../adminLayout/reusableEffect";
import CounterCard from "../../../Components/counterCard";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import TransactionModal from "../../../Components/transactionModal";
import LargeModal from "../../../Components/largeModal";
import pendingIcon from "../../../assets/icons/pending.svg";
import eyeIcon from "../../../assets/icons/eyeFill.svg";
import successIcon from "../../../assets/icons/success2.svg";
import rejectIcon from "../../../assets/icons/failed.svg";
import InvestmentDetailsText from "../../../Components/investmentDetailsText";
import Buttons from "../../../Components/buttons";
import Modal from "../../../Components/modals";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../../../Components/passwordInput";
import { updateUserInvestments } from "../../../hooks/local/adminReducer";

const Withdrawals = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Customer Withdrawals");
        document.title = "Customer Withdrawals | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const withdrawalHistoryLog = useWithdrawalRequest();
    const [tabVisibility, setTabVisibility] = useState({ withdrawalTab: true, pendingWithdrawalTab: false });
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [approvalModal, setApprovalModal] = useState(null);
    const [approvalStatus, setApprovalStatus] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [selectedPendingTransaction, setSelectedPendingTransaction] = useState(null);
    const showTab = (tabId) => {
        setTabVisibility(() => ({
            withdrawalTab: tabId === 'withdrawalTab',
            pendingWithdrawalTab: tabId === 'pendingWithdrawalTab',
        }))
    }
    const updateUserInvestment = useFormik({
        initialValues: {
            adminPasskey: "",
            message: "",
        },
        validationSchema: Yup.object({
            adminPasskey: Yup.string().required("Administrative Key cannot be empty").matches(/^\d{4}$/, 'Transaction Pin can only be 4 digits'),
            message: Yup.string().required("Message cannot be empty"),
        }),
        onSubmit: async (values) => {
            const { adminPasskey, message } = values;
            let investmentData = { adminPasskey, message, transactionId, approvalStatus };
            const { payload } = await dispatch(updateUserInvestments(investmentData));
            if(payload.statusCode === "200"){
                setApprovalModal(false);
            }
        }
    })
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <NavigationHeader title={'Withdrawal History'} />
            <div className="mt-10 grid md:flex gap-4 mb-4">
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.withdrawalTab ? 'opacity-50' : ''}`} onClick={() => showTab('withdrawalTab')} >Withdrawal List</span>
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.pendingWithdrawalTab ? 'opacity-50' : ''}`} onClick={() => showTab('pendingWithdrawalTab')}>Pending Withdrawal</span>
            </div>

            <div id="withdrawalTab" className={tabVisibility.withdrawalTab ? '' : 'hidden'}>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <CounterCard title={'Total Amount Withdraw'}
                        number={`\u20A6${withdrawalHistoryLog.withdrawalSummary?.totalWithdrawal ? withdrawalHistoryLog.withdrawalSummary.totalWithdrawal : ''}`}
                        bgColor={'#C3FFC6'} />
                    <CounterCard title={'Today Withdrawal'}
                        number={`\u20A6${withdrawalHistoryLog.withdrawalSummary?.todayWithdrawal ? withdrawalHistoryLog.withdrawalSummary.todayWithdrawal : ''}`}
                        bgColor={'#FFEFCA'} />
                    <CounterCard title={'Total Withdrawals'}
                        number={withdrawalHistoryLog.withdrawalSummary?.noOfWithdrawals ? withdrawalHistoryLog.withdrawalSummary.noOfWithdrawals : ''}
                        bgColor={'#C3FFC6'} />
                </div>

                {
                    withdrawalHistoryLog?.withdrawalList?.length > 0 ?
                        <div className="overflow-x-scroll mt-10">
                            <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                                <thead className="bg-[#EBFFEB]">
                                    <tr>
                                        <th>S/N</th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Customer Name</p></th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Channel</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount</p></th>
                                        <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date </p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {withdrawalHistoryLog.withdrawalList.map((val, key) => {
                                        const statusColor = (val.status === "Active") ? 'text-primary' : (val.status === "Pending") ? 'text-yellow-500' : 'text-red-500';
                                        return (

                                            <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedTransaction(val)}>
                                                <td className="px-3 py-4"><p>{key + 1}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.userData?.firstName} {val.userData?.lastname}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.channel}</p></td>
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
                                                                <img src={(selectedTransaction.status) === "Active" ? successIcon : (selectedTransaction.status) === "Pending" ? pendingIcon : rejectIcon} alt="" />
                                                            </div>
                                                            <p className="capitalize text-sm font-medium">"selectedTransaction.transactionType"</p>
                                                            <p className="text-2xl font-medium">&#8358;<span>{selectedTransaction.amount}</span></p>
                                                            <p className="text-xs">Withdrawal from <span>{selectedTransaction.channel}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-44 bg-brandyellow flex items-center">
                                                        <div className="w-full px-3 text-xs grid gap-3">
                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">Account Number:</div>
                                                                <div className="font-bold text-right"><span className="mx-4">{selectedTransaction.accountNumber}</span></div>
                                                            </div>

                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">Account Name:</div>
                                                                <div className="font-bold text-right">{selectedTransaction.accountName}</div>
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
                                    <img src={comingSoon} alt="" />
                                </div>
                                <p className="text-center text-lg font-semibold text-primary">No Withdrawal Available yet</p>
                            </div>
                        )
                }


            </div>

            <div id="pendingWithdrawalTab" className={tabVisibility.pendingWithdrawalTab ? '' : 'hidden'}>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <CounterCard title={'Today Pending Withdrawal Amount'}
                        number={`\u20A6${withdrawalHistoryLog.withdrawalSummary?.pendingWithdrawal ? withdrawalHistoryLog.withdrawalSummary.pendingWithdrawal : ''}`}
                        bgColor={'#FFEFCA'} />
                    <CounterCard title={'Total Pending Withdrawal'}
                        number={withdrawalHistoryLog.withdrawalSummary?.noOfPendingWithdrawal ? withdrawalHistoryLog.withdrawalSummary.noOfPendingWithdrawal : ''}
                        bgColor={'#C3FFC6'} />
                    <CounterCard title={'Today Withdrawal'}
                        number={withdrawalHistoryLog.withdrawalSummary?.noOfTodayWithdrawal ? withdrawalHistoryLog.withdrawalSummary.noOfTodayWithdrawal : ''}
                        bgColor={'#FFEFCA'} />
                </div>

                {
                    withdrawalHistoryLog?.pendingWithdrawalList?.length > 0 ?
                        <div className="overflow-x-scroll mt-10">
                            <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                                <thead className="bg-[#EBFFEB]">
                                    <tr>
                                        <th>S/N</th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Customer Name</p></th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Channel</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount</p></th>
                                        <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date Invested</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {withdrawalHistoryLog.pendingWithdrawalList.map((val, key) => {
                                        const statusColor = (val.status === "Active") ? 'text-primary' : (val.status === "Pending") ? 'text-yellow-500' : 'text-red-500';
                                        return (

                                            <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedPendingTransaction(val)}>
                                                <td className="px-3 py-4"><p>{key + 1}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.userData?.firstName} {val.userData?.lastname}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.channel}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[150px]">&#8358;{val.amount}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[100px]">{val.insertedDt}</p></td>
                                                <td className="px-3 py-4"><p className={`truncate w-[80px] font-medium ${statusColor}`}>{val.status}</p></td>
                                                <td className="px-3 py-4 hover:scale-105"><button onClick={() => setSelectedPendingTransaction(val)}><img src={eyeIcon} alt="" /></button></td>
                                            </tr>

                                        )
                                    }
                                    )}
                                    {
                                        selectedPendingTransaction && (
                                            <LargeModal isVisible={selectedPendingTransaction !== null} onClose={() => setSelectedPendingTransaction(null)}>
                                                
                                                    <p className="text-primary text-lg font-bold">Withdrawal Details</p>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 py-5">
                                                    <div>
                                                        <InvestmentDetailsText title={'Customer FullName'} text={selectedPendingTransaction.userData.lastname + " " + selectedPendingTransaction.userData.firstName} />
                                                        <InvestmentDetailsText title={'Gender'} text={selectedPendingTransaction.userData.gender} />
                                                        <InvestmentDetailsText title={'EmailAddress'} text={selectedPendingTransaction.userData.emailAddress} />
                                                        <InvestmentDetailsText title={'Phone Number'} text={selectedPendingTransaction.userData.phoneNumber} />
                                                        <InvestmentDetailsText title={'Home Address'} text={selectedPendingTransaction.userData.address} />
                                                    </div>
                                                    <div>
                                                        <InvestmentDetailsText title={'Bank'} text={selectedPendingTransaction.bank} />
                                                        <InvestmentDetailsText title={'Account Name'} text={selectedPendingTransaction.accountName} />
                                                        <InvestmentDetailsText title={'Account Number'} text={selectedPendingTransaction.accountNumber} />
                                                        <InvestmentDetailsText title={'Transaction Number'} text={selectedPendingTransaction.transactionId} />
                                                    </div>
                                                    <div>
                                                        <InvestmentDetailsText title={'Amount to Withdraw'} text={`\u20A6${selectedPendingTransaction.amount}`} />
                                                        <InvestmentDetailsText title={'Channel'} text={selectedPendingTransaction.channel} />
                                                        <InvestmentDetailsText title={'Transaction Date'} text={selectedPendingTransaction.insertedDt} />
                                                        <InvestmentDetailsText title={'Status'} text={selectedPendingTransaction.status} />
                                                    </div>
                                                </div>
                                                <div className="grid gap-y-4 md:flex md:justify-between ">
                                                    <Buttons btnText={'Approve Withdrawal'} btnType={'primary'} onClick={() => {
                                                        setApprovalModal(true);
                                                        setSelectedPendingTransaction(null);
                                                        setApprovalStatus("0")
                                                        setTransactionId(selectedPendingTransaction.transactionId)
                                                    }} />
                                                    <Buttons btnText={'Reject Withdrawal'} btnType={'delete'} onClick={() => {
                                                        setApprovalModal(true);
                                                        setSelectedPendingTransaction(null);
                                                        setApprovalStatus("2")
                                                        setTransactionId(selectedPendingTransaction.transactionId)
                                                    }} />
                                                </div>
                                            </LargeModal>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        :
                        (
                            <div className="grid gap-4 my-16">
                                <div className="w-full grid justify-center">
                                    <img src={comingSoon} alt="" />
                                </div>
                                <p className="text-center text-lg font-semibold text-primary">No Pending Withdrawal Available yet</p>
                            </div>
                        )
                }

            </div>

            <Modal isVisible={approvalModal} onClose={() => {setApprovalModal(false);updateUserInvestment.resetForm()}} >
                <form onSubmit={updateUserInvestment.handleSubmit}>
                    <p className={`text-xl text-primary font-medium pb-4`}>{(approvalStatus === "0") ? "Approve" : "Reject"} Withdrawal</p>
                    <PasswordInput labelName={'Admin Transaction Pin'}
                        inputName={'adminPasskey'}
                        inputOnBlur={updateUserInvestment.handleBlur}
                        inputOnChange={updateUserInvestment.handleChange}
                        inputValue={updateUserInvestment.values.adminPasskey}
                        inputError={updateUserInvestment.errors.adminPasskey && updateUserInvestment.touched.adminPasskey ? updateUserInvestment.errors.adminPasskey : null} />
                    <div className="grid py-5">
                        <span className="text-sm font-medium text-primary">Message:</span>
                        <textarea rows="5" cols="5" name="message" className="p-3 bg-[#f8f8f8] border text-sm rounded"
                            onBlur={updateUserInvestment.handleBlur}
                            onChange={updateUserInvestment.handleChange}
                            value={updateUserInvestment.values.message}
                        />

                        <code className="text-red-500 text-xs">{updateUserInvestment.touched.message && updateUserInvestment.errors.message ? updateUserInvestment.errors.message : null} </code>
                    </div>
                    <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
                </form>
            </Modal>
        </div>
    );
}

export default Withdrawals;