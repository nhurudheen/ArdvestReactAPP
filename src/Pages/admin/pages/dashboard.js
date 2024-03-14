import { useEffect, useState } from "react";
import { getPeriodOfDay } from "../../../Utils/utils";
import { useSelector } from "react-redux";
import { useDashboardSummary } from "../adminLayout/reusableEffect";
import Spinner from "../../../Components/spinner";
import { Link } from "react-router-dom";

const AdminDashboard = ({ setPageTitle }) => {

    useEffect(() => {
        setPageTitle("Dashboard");
        document.title = "Dashboard | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
        setTimeOfTheDay(getPeriodOfDay);
    }, [setPageTitle]);
    const [timeOfTheDay, setTimeOfTheDay] = useState("");
    const adminSession = useSelector((state) => state.admin.adminSessionData)
    const dashboardData = useDashboardSummary();
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <div className="bg-white p-4 md:px-8 rounded-lg">
                <p>Good {timeOfTheDay} <span className="font-semibold">{adminSession.firstName}</span></p>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-8">
                    <Link to={'customer'} >
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total active Customer.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.totalUser ? dashboardData.totalUser : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"investment"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total Number of Investment.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.totalNoOfInvestment ? dashboardData.totalNoOfInvestment : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"request"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total Number of Customer Investments.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.totalNoOfUserInvestment ? dashboardData.totalNoOfUserInvestment : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"request"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total Pending Investment Request.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.pendingInvestment ? dashboardData.pendingInvestment : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"request"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Today Investment.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.todayInvestment ? dashboardData.todayInvestment : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"withdrawals"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total Number of Withdrawal.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.totalWithdrawal ? dashboardData.totalWithdrawal : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"withdrawals"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm ">Today Withdrawal</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.todayWithdrawal ? dashboardData.todayWithdrawal : '0'}</p>
                        </div>
                    </Link>
                    <Link to={"withdrawals"}>
                        <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                            <p className="h-16 overflow-hidden text-sm">Total Pending Withdrawal Request.</p>
                            <p className="text-end text-3xl font-semibold">{dashboardData?.pendingWithdrawal ? dashboardData.pendingWithdrawal : '0'}</p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;