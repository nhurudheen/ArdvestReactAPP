import { useEffect, useState } from "react";
import { useInvestmentRequest } from "../adminLayout/reusableEffect";
import CounterCard from "../../../Components/counterCard";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import TransactionModal from "../../../Components/transactionModal";
import pendingIcon from "../../../assets/icons/pending.svg";
import eyeIcon from "../../../assets/icons/eyeFill.svg";
import successIcon from "../../../assets/icons/success2.svg";
import rejectIcon from "../../../assets/icons/close.svg";

const InvestmentRequest = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investment Request");
        document.title = "Investment Request | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    const investmentHistoryLog = useInvestmentRequest();
    const [tabVisibility, setTabVisibility] = useState({ investmentTab: true, pendingInvestmentTab: false });
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const showTab = (tabId) => {
        setTabVisibility(() => ({
            investmentTab: tabId === 'investmentTab',
            pendingInvestmentTab: tabId === 'pendingInvestmentTab',
        }))
    }
    console.log(investmentHistoryLog);
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <NavigationHeader title={'Investment Request Details'} />
            <div className="mt-10 grid md:flex gap-4 mb-4">
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investmentTab ? 'opacity-50' : ''}`} onClick={() => showTab('investmentTab')} >Investment Details</span>
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.pendingInvestmentTab ? 'opacity-50' : ''}`} onClick={() => showTab('pendingInvestmentTab')}>Pending Investment</span>
            </div>

            <div id="investmentTab" className={tabVisibility.investmentTab ? '' : 'hidden'}>
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
                                        <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Investment Name</p></th>
                                        <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount</p></th>
                                        <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date</p></th>
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
                                <p className="text-center text-lg font-semibold text-primary">No Transactions Available yet</p>
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


            </div>

        </div>
    );
}

export default InvestmentRequest;