import { Route, Routes } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminTopBar from "./topBar";
import AdminDashboard from "../pages/dashboard";
import { useState } from "react";
import AdminLogOut from "../pages/logout";
import { useSelector } from "react-redux";
import Customer from "../pages/customers";

const AdminLayout = () => {
    const adminSession= useSelector((state)=>state.admin.adminSessionData);
    const [sideBarVisibility, setSideBarVisibility] = useState(false);
    const toggleSideBar = ()=>{
        setSideBarVisibility(!sideBarVisibility); 
    }
    const closeSideBar = ()=>{
        setSideBarVisibility(false);
    }
    const [pageTitle, setPageTitle] = useState("");
    if(!adminSession){
        return <AdminLogOut/>;
    }
    return (
        <div className="">
            <AdminTopBar toggleSideBar={toggleSideBar} topBarTitle={pageTitle} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-3 md:px-8 pt-2">
                <AdminSideBar sideBarVisibility={sideBarVisibility} topBarTitle={pageTitle} closeSideBar={closeSideBar} />
                <Routes>
                    <Route path="*" element={<AdminDashboard setPageTitle={setPageTitle} />} />
                    <Route path="/customer" element={<Customer setPageTitle={setPageTitle} />}/>
                    <Route path="/logout" element={<AdminLogOut/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default AdminLayout;