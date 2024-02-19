import { useEffect, useState } from "react";
import { getPeriodOfDay } from "../../../Utils/utils";

const AdminDashboard = ({setPageTitle}) => {
    const [timeOfTheDay, setTimeOfTheDay] = useState("");
    useEffect(() => {
        setPageTitle("Dashboard");
        document.title = "Dashboard | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
        setTimeOfTheDay(getPeriodOfDay); 
      }, [setPageTitle]);
    return ( 
        <div className="col-span-10">
            <div className="bg-white p-4 md:px-8 rounded-lg">
        <p>Good {timeOfTheDay} <span className="font-semibold">Deen Admin</span></p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
              <p className="h-16 overflow-hidden text-sm">Total active Customer.</p>
              {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalUser']?></p> */}
              <p className="text-end text-3xl font-semibold">0</p>
            </div>    
            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Investment.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalNoOfInvestment']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Customer Investments.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalNoOfUserInvestment']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Active Customer Investment.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalNoOfUserActiveInvestment']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Pending Deposit Request.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['pendingDeposit']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Pending Withdrawal Request.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['pendingWithdrawal'] ?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>
            
            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Today Deposit.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['todayDeposit']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>
            
            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm ">Today Withdrawal</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['todayWithdrawal']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#C3FFC6] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Deposit.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalDeposit']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>

            <div className="grid border p-4 rounded-lg gap-8 bg-[#FFEFCA] hover:scale-105">
                <p className="h-16 overflow-hidden text-sm">Total Number of Withdrawal.</p>
                {/* <p className="text-end text-3xl font-semibold"><?php echo $summary['totalWithdrawal']?></p> */}
                <p className="text-end text-3xl font-semibold">0</p>
            </div>
       
        </div>
      </div>
        </div>
     );
}
 
export default AdminDashboard;