import homeIcon from '../../../assets/icons/home.svg';
import portfolioIcon from '../../../assets/icons/portfoliio.svg';
import transactionIcon from '../../../assets/icons/transaction.svg';
import supportIcon from '../../../assets/icons/support.svg';
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
                        <img src={supportIcon} alt="" />
                        <div className="text-lg font-medium">Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;