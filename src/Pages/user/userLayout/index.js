import { Route, Routes } from "react-router-dom";
import UserDashboard from "../pages/dashboard";
import TopBar from "./topBar";
import SideBar from "./sideBar";
import { useState } from "react";

const UserLayout = () => {
    const [sideBarVisibility, setSideBarVisibility] = useState(false);
    const toggleSideBar = ()=>{
        setSideBarVisibility(!sideBarVisibility); 
    }
    return ( 
        <div>
            <TopBar toggleSideBar={toggleSideBar}/>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 px-3 md:px-8  pb-20">
            <SideBar sideBarVisibility={sideBarVisibility}/>
            <Routes>
                <Route path="/dashboard" element={<UserDashboard/>}/>
            </Routes>
            </div>
        </div>
     );
}
 
export default UserLayout;