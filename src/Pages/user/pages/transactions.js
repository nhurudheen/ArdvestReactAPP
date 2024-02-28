import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import eyeIcon from "../../../assets/icons/eyeFill.svg";
import pendingIcon from "../../../assets/icons/pending.svg";
import { useUserTransactionHistory } from "../userLayout/reusableEffects";
import comingSoonSvg from "../../../assets/icons/comingSoon.svg";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import TransactionModal from "../../../Components/transactionModal";
import { SearchTable } from "../../../Utils/utils";

const Transactions = ({ setPageTitle }) => {
    const transactionList = useUserTransactionHistory();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    useEffect(() => {
        setPageTitle("Transactions");
        document.title = "Transactions | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track Transactions, inflow and outflow of investment, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    return (
        <div className="col-span-10 bg-white md:px-5 pb-8 rounded-lg md:mx-4">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-0 mb-8 items-center">
                <NavigationHeader title={'All Transactions'} />
                <div className="justify-end flex">
                    <input type="search" name="" id="searchInput" className="p-3 bg-[#f8f8f880] focus:outline focus:outline-primary border text-sm rounded w-full md:w-2/3 placeholder:text-xs" onInput={SearchTable} placeholder="Search Transactions..." />
                </div>
            </div>


            {
                transactionList.length > 0 ?
                    <div className="overflow-x-scroll mt-10">
                        <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                            <thead className="bg-[#EBFFEB]">
                                <tr>
                                    <th>S/N</th>
                                    <th className="px-6 py-4 text-start"><p className="truncate w-[180px]">Transaction Type</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount</p></th>
                                    <th className="px-3 py-4 text-start "><p className="truncate w-[100px]">Date</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[80px]">Status</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[10px]"></p></th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactionList.map((val, key) => {
                                    const statusColor = (val.status === "Approved") ? 'text-primary' : 'text-red-500';
                                    return (

                                        <tr key={val.id || key} className="odd:bg-[#F9F9F9] border-t-8 border-t-white" onClick={() => setSelectedTransaction(val)}>
                                            <td className="px-3 py-4"><p>{key + 1}</p></td>
                                            <td className="px-6 py-4"><p className="truncate w-[180px]">{val.transactionType}</p></td>
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
                                                            <img src={pendingIcon} alt=""/>
                                                        </div>
                                                        <p className="capitalize text-sm font-medium">{selectedTransaction.transactionType}</p>
                                                        <p className="text-2xl font-medium">&#8358;<span>{selectedTransaction.amount}</span></p>
                                                        <p className="text-xs">Transaction ID: <span>{selectedTransaction.transactionId}</span></p>
                                                    </div>
                                                </div>
                                                <div className="w-full h-44 bg-brandyellow flex items-center">
                                                    <div className="w-full px-3 text-xs grid gap-3">
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Transaction Type:</div>
                                                            <div className="font-bold"><span className="mx-4">{
                                                                (selectedTransaction.transactionType === "Deposit") ? "Credit" :(selectedTransaction.transactionType === "'Return on Investment") ?'Credit':'Debit'
                                                            }</span></div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium pr-2">Description:</div>
                                                            <div className="font-bold text-right">{selectedTransaction.description}</div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Date:</div>
                                                            <div className="font-bold">{selectedTransaction.insertedDt}</div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium">Status:</div>
                                                            <div className="font-bold"><span>{selectedTransaction.status}</span></div>
                                                        </div>
                                                        <div className="flex justify-between pb-1 border-b border-b-black/10">
                                                            <div className="font-medium pr-2">Message:</div>
                                                            <div className="font-bold"><span>{selectedTransaction.message}</span></div>
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
                            <p className="text-center text-lg font-semibold text-primary">No Transactions Available yet</p>
                        </div>
                    )
            }



        </div>

    );
}

export default Transactions;