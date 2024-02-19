import { useEffect, useState } from "react";
import { getPeriodOfDay } from "../../../Utils/utils";
import { useSelector } from "react-redux";
import { useDashboardSummary } from "../adminLayout/reusableEffect";
import Spinner from "../../../Components/spinner";

const AdminDashboard = ({setPageTitle}) => {
   
    useEffect(() => {
        setPageTitle("Dashboard");
        document.title = "Dashboard | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
        setTimeOfTheDay(getPeriodOfDay); 
      }, [setPageTitle]);
      const [timeOfTheDay, setTimeOfTheDay] = useState("");
      const adminSession= useSelector((state)=>state.user.adminSessionData)
      const dashboardData = useDashboardSummary();
    return ( 
        <div className="col-span-10">
            <Spinner loading={useSelector((state)=>state.user).loading}/>
            <div className="bg-white p-4 md:px-8 rounded-lg">
        <p>Good {timeOfTheDay} <span className="font-semibold">{adminSession.firstName}</span></p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
              <p className="h-16 overflow-hidden text-sm">Total active Customer.</p>
              <p className="text-end text-3xl font-semibold">{dashboardData?.totalUser ? dashboardData.totalUser : '0'}</p>
            </div>    
            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Investment.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.totalNoOfInvestment ? dashboardData.totalNoOfInvestment : '0'}</p>
            </div>
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Customer Investments.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.totalNoOfUserInvestment ? dashboardData.totalNoOfUserInvestment : '0'}</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Active Customer Investment.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.totalNoOfUserActiveInvestment ? dashboardData.totalNoOfUserActiveInvestment : '0'}</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Pending Deposit Request.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.pendingDeposit ? dashboardData.pendingDeposit : '0'}</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Pending Withdrawal Request.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.pendingWithdrawal ? dashboardData.pendingWithdrawal : '0'}</p>
            </div>
            
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Today Deposit.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.todayDeposit ? dashboardData.todayDeposit : '0'}</p>
            </div>
            
            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm ">Today Withdrawal</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.todayWithdrawal ? dashboardData.todayWithdrawal : '0'}</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Deposit.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.totalDeposit ? dashboardData.totalDeposit : '0'}</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Withdrawal.</p>
                <p className="text-end text-3xl font-semibold">{dashboardData?.totalWithdrawal ? dashboardData.totalWithdrawal : '0'}</p>
            </div>
       
        </div>
      </div>
        </div>
     );
}
 
export default AdminDashboard;