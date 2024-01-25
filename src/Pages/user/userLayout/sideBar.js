import homeIcon from '../../../assets/icons/home.svg';
import portfolioIcon from '../../../assets/icons/portfoliio.svg';
import transactionIcon from '../../../assets/icons/transaction.svg';
import supportIcon from '../../../assets/icons/support.svg';
const SideBar = ({sideBarVisibility}) => {
    return (
        <div className={`col-span-12 lg:col-span-2 ${sideBarVisibility ?'block':'hidden'} lg:block h-screen`} id="sidebar">
            <div className="grid gap-4">
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center bg-primary/10 p-3 rounded-lg">
                        <img src={homeIcon} alt=""/>
                            <div className="text-lg text-primary font-medium">Dashboard</div>
                    </div>
                </div>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={portfolioIcon} alt=""/>
                            <div className="text-lg font-medium">Portfolio</div>
                    </div>
                </div>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={transactionIcon} alt=""/>
                            <div className="text-lg font-medium">Transactions</div>
                    </div>
                </div>
                <div className="pb-2 border-b">
                    <div className="flex gap-3 items-center p-3">
                        <img src={supportIcon} alt=""/>
                            <div className="text-lg font-medium">Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;