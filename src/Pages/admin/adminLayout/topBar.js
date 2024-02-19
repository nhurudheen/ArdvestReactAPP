import ardvestLogo from '../../../assets/icons/logo.svg';
import notificationLogo from '../../../assets/icons/notification.svg';
import menuIcon from '../../../assets/icons/menu.svg';
import { Link } from 'react-router-dom';
const AdminTopBar = ({ toggleSideBar, topBarTitle }) => {
    return (
        <div>
            <div className="border-b h-[10vh] md:h-[12vh] grid grid-cols-2 md:grid-cols-12 items-center px-3 md:px-8">
                <div className="col-span-1 md:col-span-2"><Link to={'/management/'}><img src={ardvestLogo} alt="" /></Link></div>
                <div className="col-span-1 md:col-span-10 flex justify-end md:justify-between">
                    <p className="text-lg font-bold text-primary hidden lg:block">{topBarTitle}</p>
                    <div className="flex gap-4 ">
                        <img src={notificationLogo} alt="" className="cursor-pointer" onClick="openModal('notifications')" />
                        <Link to={'profile'}>
                            <div className="h-8 w-8 bg-primary text-white rounded-full text-sm font-bold flex items-center justify-center">
                                GH
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8">
                <span className="p-2">
                    <img src={menuIcon} alt="" className="h-8 w-8 bg-white shadow-sm wounded-lg lg:hidden" id="menu-icon" onClick={toggleSideBar} />
                </span>
            </div>
        </div>
    );
}

export default AdminTopBar;