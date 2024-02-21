import { Link } from "react-router-dom";
import homeIcon from "../../../assets/icons/home.svg";
import customerIcon from "../../../assets/icons/customers.svg";
import investmentIcon from "../../../assets/icons/investment.svg";
import requestIcon from "../../../assets/icons/requests.svg";
import settingsIcon from "../../../assets/icons/settings.svg";
import powerIcon from "../../../assets/icons/power.svg";
const AdminSideBar = ({ sideBarVisibility, topBarTitle, closeSideBar }) => {
    return (
        <div className={`col-span-12 lg:col-span-2 ${sideBarVisibility ? 'block' : 'hidden'} lg:block h-screen`} id="sidebar">
            <div className="grid gap-4">
                <Link to={"dashboard"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Dashboard' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={homeIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Dashboard' ? 'text-primary' : ''} font-medium`}>Dashboard</div>
                        </div>
                    </div>
                </Link>
                <Link to={"customer"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Customers' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={customerIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Customers' ? 'text-primary' : ''} font-medium`}>Customers</div>
                        </div>
                    </div>
                </Link>
                <Link to={"/investment"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Investments' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={investmentIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Investments' ? 'text-primary' : ''} font-medium`}>Investments</div>
                        </div>
                    </div>
                </Link>
                <Link to={"/Requests"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Requests' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={requestIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Requests' ? 'text-primary' : ''} font-medium`}>Requests</div>
                        </div>
                    </div>
                </Link>

                <Link to={"/settings"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Settings' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={settingsIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Settings' ? 'text-primary' : ''} font-medium`}>Settings</div>
                        </div>
                    </div>
                </Link>
    
    
                <Link to={"logout"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'SignOut' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={powerIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'LogOut' ? 'text-primary' : ''} font-medium`}>Sign Out</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default AdminSideBar;