import { useEffect, useState } from "react";
import { useInvestmentRequest } from "../adminLayout/reusableEffect";
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
import { SearchTable, filterTable } from "../../../Utils/utils";

const InvestmentRequest = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investment Request");
        document.title = "Investment Request | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const investmentHistoryLog = useInvestmentRequest();
    console.log(investmentHistoryLog);
    const [tabVisibility, setTabVisibility] = useState({ investmentTab: true, pendingInvestmentTab: false });
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [approvalModal, setApprovalModal] = useState(null);
    const [approvalStatus, setApprovalStatus] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [selectedPendingTransaction, setSelectedPendingTransaction] = useState(null);
    const showTab = (tabId) => {
        setTabVisibility(() => ({
            investmentTab: tabId === 'investmentTab',
            pendingInvestmentTab: tabId === 'pendingInvestmentTab',
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
            <NavigationHeader title={'Investment Request Details'} />
            <div className="mt-10 grid md:flex gap-4 mb-4">
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investmentTab ? 'opacity-50' : ''}`} onClick={() => showTab('investmentTab')} >Investment Details</span>
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.pendingInvestmentTab ? 'opacity-50' : ''}`} onClick={() => showTab('pendingInvestmentTab')}>Pending Investment</span>
            </div>

            <div id="investmentTab" className={tabVisibility.investmentTab ? '' : 'hidden'}>
            <div className="flex justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <label for="statusFilter" className="block text-sm font-medium">Showing :</label>
                        <select id="statusFilter" onChange={() => filterTable(6)} className="text-sm focus:outline-none focus:border-none ">
                            <option value="All">All Investment</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="">
                        <input type="search" name="" id="searchInput" className="p-2 bg-[#f8f8f880] focus:outline focus:outline-primary border text-sm rounded w-full placeholder:text-xs" onInput={SearchTable} placeholder="Search History..." />
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <CounterCard title={'Total Invested Amount'}
                        number={`\u20A6${investmentHistoryLog.investmentSummary?.totalInvestedAmount ? investmentHistoryLog.investmentSummary.totalInvestedAmount : ''}`}
                        bgColor={'#C3FFC6'} />
                    <CounterCard title={'Today Invested Amount'}
                        number={`\u20A6${investmentHistoryLog.investmentSummary?.todayInvestedAmount ? investmentHistoryLog.investmentSummary.todayInvestedAmount : ''}`}
                        bgColor={'#FFEFCA'} />
                    <CounterCard title={'Total Investment'}
                        number={investmentHistoryLog.investmentSummary?.totalInvestment ? investmentHistoryLog.investmentSummary.totalInvestment : ''}
                        bgColor={'#C3FFC6'} />
                </div>

                {
                    investmentHistoryLog?.investmentList?.length > 0 ?
                        <div className="overflow-x-scroll mt-10">
                            <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                                <thead className="bg-[#EBFFEB]">
                                    <tr>
                                        <th>S/N</th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Customer Name</p></th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Portfolio</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount Invested</p></th>
                                        <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date Invested</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {investmentHistoryLog.investmentList.map((val, key) => {
                                        const statusColor = (val.status === "Active") ? 'text-primary' : (val.status === "Pending") ? 'text-yellow-500' : 'text-red-500';
                                        return (

                                            <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedTransaction(val)}>
                                                <td className="px-3 py-4"><p>{key + 1}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.userData?.firstName} {val.userData?.lastname}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.investmentName}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[150px]">&#8358;{val.amount}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[100px]">{val.dateBooked}</p></td>
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
                                                            <p className="capitalize text-sm font-medium">{selectedTransaction.transactionType}</p>
                                                            <p className="text-2xl font-medium">&#8358;<span>{selectedTransaction.amount}</span></p>
                                                            <p className="text-xs">Investment for <span>{selectedTransaction.investmentName}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-44 bg-brandyellow flex items-center">
                                                        <div className="w-full px-3 text-xs grid gap-3">
                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">ROI:</div>
                                                                <div className="font-bold"><span className="mx-4">{selectedTransaction.roi}%</span></div>
                                                            </div>

                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">Date Invested:</div>
                                                                <div className="font-bold">{selectedTransaction.dateBooked}</div>
                                                            </div>
                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">End Date:</div>
                                                                <div className="font-bold">{selectedTransaction.investmentEndDate}</div>
                                                            </div>
                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium">Status:</div>
                                                                <div className="font-bold"><span>{selectedTransaction.status}</span></div>
                                                            </div>
                                                            <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                                <div className="font-medium pr-2">Payment Reference Number:</div>
                                                                <div className="font-bold"><span>{selectedTransaction.referenceNumber}</span></div>
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
                                <p className="text-center text-lg font-semibold text-primary">No Investment Available yet</p>
                            </div>
                        )
                }


            </div>

            <div id="pendingInvestmentTab" className={tabVisibility.pendingInvestmentTab ? '' : 'hidden'}>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <CounterCard title={'Today Investment'}
                        number={investmentHistoryLog.investmentSummary?.todayInvestment ? investmentHistoryLog.investmentSummary.todayInvestment : ''}
                        bgColor={'#FFEFCA'} />
                    <CounterCard title={'Total Pending Investment'}
                        number={investmentHistoryLog.investmentSummary?.totalPendingInvestment ? investmentHistoryLog.investmentSummary.totalPendingInvestment : ''}
                        bgColor={'#C3FFC6'} />
                    <CounterCard title={'Today Pending Investment'}
                        number={investmentHistoryLog.investmentSummary?.todayPendingInvestment ? investmentHistoryLog.investmentSummary.todayPendingInvestment : ''}
                        bgColor={'#FFEFCA'} />
                </div>

                {
                    investmentHistoryLog?.pendingInvestmentList?.length > 0 ?
                        <div className="overflow-x-scroll mt-10">
                            <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                                <thead className="bg-[#EBFFEB]">
                                    <tr>
                                        <th>S/N</th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Customer Name</p></th>
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Portfolio</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount Invested</p></th>
                                        <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date Invested</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {investmentHistoryLog.pendingInvestmentList.map((val, key) => {
                                        const statusColor = (val.status === "Active") ? 'text-primary' : (val.status === "Pending") ? 'text-yellow-500' : 'text-red-500';
                                        return (

                                            <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedPendingTransaction(val)}>
                                                <td className="px-3 py-4"><p>{key + 1}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.userData?.firstName} {val.userData?.lastname}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[180px]">{val.investmentName}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[150px]">&#8358;{val.amount}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[100px]">{val.dateBooked}</p></td>
                                                <td className="px-3 py-4"><p className={`truncate w-[80px] font-medium ${statusColor}`}>{val.status}</p></td>
                                                <td className="px-3 py-4 hover:scale-105"><button onClick={() => setSelectedPendingTransaction(val)}><img src={eyeIcon} alt="" /></button></td>
                                            </tr>

                                        )
                                    }
                                    )}
                                    {
                                        selectedPendingTransaction && (
                                            <LargeModal isVisible={selectedPendingTransaction !== null} onClose={() => setSelectedPendingTransaction(null)}>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-primary text-lg font-bold">Investment Details</p>
                                                    <div>
                                                        <button type="" onClick={()=>{
                                                            window.open(selectedPendingTransaction.paymentFile, '_blank');
                                                        }} className="border border-primary hidden md:block text-primary text-center px-4 py-2 text-xs rounded w-full hover:bg-primary hover:text-white">Download Payment Receipt</button>
                                                        <button className="block md:hidden"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(33,130,37,1)"><path d="M9 4L6 2L3 4V16V19C3 20.6569 4.34315 22 6 22H20C21.6569 22 23 20.6569 23 19V17H7V19C7 19.5523 6.55228 20 6 20C5.44772 20 5 19.5523 5 19V15H21V4L18 2L15 4L12 2L9 4Z"></path></svg></button>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 py-5">
                                                    <div>
                                                        <InvestmentDetailsText title={'Customer FullName'} text={selectedPendingTransaction.userData.lastname + " " + selectedPendingTransaction.userData.firstName} />
                                                        <InvestmentDetailsText title={'Gender'} text={selectedPendingTransaction.userData.gender} />
                                                        <InvestmentDetailsText title={'EmailAddress'} text={selectedPendingTransaction.userData.emailAddress} />
                                                        <InvestmentDetailsText title={'Next of Kin'} text={selectedPendingTransaction.userData.nextOfKinName} />
                                                        <InvestmentDetailsText title={'Next of Kin Phone Number'} text={selectedPendingTransaction.userData.nextOfKinPhone} />
                                                    </div>
                                                    <div>
                                                        <InvestmentDetailsText title={'Phone Number'} text={selectedPendingTransaction.userData.phoneNumber} />
                                                        <InvestmentDetailsText title={'Home Address'} text={selectedPendingTransaction.userData.address} />
                                                        <InvestmentDetailsText title={'BVN'} text={selectedPendingTransaction.userData.bvn} />
                                                        <InvestmentDetailsText title={'Next of Kin Address'} text={selectedPendingTransaction.userData.nextOfKinAddress} />
                                                        <InvestmentDetailsText title={'Payment Reference Number'} text={selectedPendingTransaction.referenceNumber} />
                                                    </div>
                                                    <div>
                                                        <InvestmentDetailsText title={'Investment Name'} text={selectedPendingTransaction.investmentName} />
                                                        <InvestmentDetailsText title={'Date Booked'} text={selectedPendingTransaction.dateBooked} />
                                                        <InvestmentDetailsText title={'Investment End Date'} text={selectedPendingTransaction.investmentEndDate} />
                                                        <InvestmentDetailsText title={'ROI'} text={selectedPendingTransaction.roi + '%'} />
                                                        <InvestmentDetailsText title={'Amount Invested'} text={`\u20A6${selectedPendingTransaction.amount}`} />
                                                    </div>
                                                </div>
                                                <div className="grid gap-y-4 md:flex md:justify-between ">
                                                    <Buttons btnText={'Approve Investment'} btnType={'primary'} onClick={() => {
                                                        setApprovalModal(true);
                                                        setSelectedPendingTransaction(null);
                                                        setApprovalStatus("0")
                                                        setTransactionId(selectedPendingTransaction.transactionId)
                                                    }} />
                                                    <Buttons btnText={'Reject Investment'} btnType={'delete'} onClick={() => {
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
                                <p className="text-center text-lg font-semibold text-primary">No Pending Investment Available yet</p>
                            </div>
                        )
                }

            </div>

            <Modal isVisible={approvalModal} onClose={() => {setApprovalModal(false);updateUserInvestment.resetForm()}} >
                <form onSubmit={updateUserInvestment.handleSubmit}>
                    <p className={`text-xl text-primary font-medium pb-4`}>{(approvalStatus === "0") ? "Approve" : "Reject"} Investment</p>
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

export default InvestmentRequest;