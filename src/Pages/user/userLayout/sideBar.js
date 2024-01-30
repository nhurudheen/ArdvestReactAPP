import homeIcon from '../../../assets/icons/home.svg';
import portfolioIcon from '../../../assets/icons/portfoliio.svg';
import transactionIcon from '../../../assets/icons/transactions.svg';
import settingsIcon from '../../../assets/icons/settings.svg';
import powerIcon from '../../../assets/icons/power.svg';
import profileIcon from '../../../assets/icons/user.svg';
import { Link } from 'react-router-dom';
const SideBar = ({ sideBarVisibility, topBarTitle, closeSideBar }) => {
    return (
        <div className={`col-span-12 lg:col-span-2 ${sideBarVisibility ? 'block' : 'hidden'} lg:block h-screen`} id="sidebar">
            <div className="grid gap-4">
                <Link to={"/dashboard"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Dashboard' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={homeIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Dashboard' ? 'text-primary' : ''} font-medium`}>Dashboard</div>
                        </div>
                    </div>
                </Link>
                <Link to={"/investment"} onClick={closeSideBar}>
                    <div className="pb-2 border-b">
                        <div className={`flex gap-3 items-center ${topBarTitle === 'Investments' ? 'bg-primary/10' : 'hover:bg-primary/10'} p-3 rounded-lg hover:scale-105`}>
                            <img src={portfolioIcon} alt="" />
                            <div className={`text-lg ${topBarTitle === 'Investments' ? 'text-primary' : ''} font-medium`}>Investments</div>
                        </div>
                    </div>
                </Link>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={transactionIcon} alt="" />
                        <div className="text-lg font-medium">Transactions</div>
                    </div>
                </div>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={profileIcon} alt="" />
                        <div className="text-lg font-medium">Profile</div>
                    </div>
                </div>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={settingsIcon} alt="" />
                        <div className="text-lg font-medium">Settings</div>
                    </div>
                </div>
                <Link to={"/userLogout"} onClick={closeSideBar}>
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

export default SideBar;