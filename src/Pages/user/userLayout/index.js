import { Route, Routes } from "react-router-dom";
import UserDashboard from "../pages/dashboard";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import { useState } from "react";
import Investment from "../pages/investment";

const UserLayout = () => {
    const [sideBarVisibility, setSideBarVisibility] = useState(false);
    const toggleSideBar = ()=>{
        setSideBarVisibility(!sideBarVisibility); 
    }
    const [pageTitle, setPageTitle] = useState("");
    return ( 
        <div>
            <TopBar toggleSideBar={toggleSideBar} topBarTitle={pageTitle}/>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 px-3 md:px-8  pb-20">
            <SideBar sideBarVisibility={sideBarVisibility} topBarTitle={pageTitle}/>
            <Routes>
                <Route path="/dashboard" element={<UserDashboard setPageTitle={setPageTitle}/>}/>
                <Route path="/investment" element={<Investment setPageTitle={setPageTitle} />}/>
            </Routes>
            </div>
        </div>
     );
}

 
export default UserLayout;
