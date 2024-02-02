import { Route, Routes } from "react-router-dom";
import UserDashboard from "../pages/dashboard";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import { useState } from "react";
import Investment from "../pages/investment";
import { useSelector } from "react-redux";
import LogOut from "../auth/logout";
import Transactions from "../pages/transactions";
import UserProfile from "../pages/profile";

const UserLayout = () => {
    const userSession = useSelector((state)=>state.user.userSessionData);
    const [sideBarVisibility, setSideBarVisibility] = useState(false);
    const toggleSideBar = ()=>{
        setSideBarVisibility(!sideBarVisibility); 
    }
    const closeSideBar = ()=>{
        setSideBarVisibility(false);
    }
    const [pageTitle, setPageTitle] = useState("");
    if(!userSession){
        return <LogOut/>;
    }
    return ( 
        <div>
            <TopBar toggleSideBar={toggleSideBar} topBarTitle={pageTitle}/>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-3 md:px-8  pb-20">
            <SideBar sideBarVisibility={sideBarVisibility} topBarTitle={pageTitle} closeSideBar={closeSideBar}/>
            <Routes>
                <Route path="/dashboard" element={<UserDashboard setPageTitle={setPageTitle}/>}/>
                <Route path="/investment" element={<Investment setPageTitle={setPageTitle} />}/>
                <Route path="/transactions" element={<Transactions setPageTitle={setPageTitle}/>}/>
                <Route path="/profile" element={<UserProfile setPageTitle={setPageTitle}/>}/>
                <Route path="/userLogout" element={<LogOut/>}/>
            </Routes>
            </div>
        </div>
     );
}

 
export default UserLayout;
