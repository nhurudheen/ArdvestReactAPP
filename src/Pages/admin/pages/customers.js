import { useEffect } from "react";

const Customer = ({setPageTitle}) =>{
    useEffect(() => {
        setPageTitle("Dashboard");
        document.title = "Dashboard | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
      }, [setPageTitle]);
    return (
        <div>

        </div>
    )
}
export default Customer;