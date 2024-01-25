import { useEffect } from "react";
const UserDashboard = ({setPageTitle}) => {
    useEffect(()=>{
        setPageTitle("Dashboard");
        document.title = "Dashboard | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);

    return ( 
        <div>
            I am  UserDashboard
        </div>
     );
}
 
export default UserDashboard;