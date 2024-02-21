import { useEffect } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import noCustomerImage from "../../../assets/icons/comingSoon.svg";
import { useCustomerList } from "../adminLayout/reusableEffect";
import { Link } from "react-router-dom";
const Customer = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Customers");
        document.title = "Customers | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore Ardvest Customers List – Your gateway to intelligent administration and personalized wealth expansion.";
    }, [setPageTitle]);
    const customerData = useCustomerList();
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <NavigationHeader title={'All Customers'} />
            {customerData.length > 0
                ?
                (
                    <div className="overflow-x-scroll mt-10">
                        <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                            <thead className="bg-[#EBFFEB]">
                                <tr>
                                    <th className="px-3">S/N</th>
                                    <th className="px-6 py-4 text-start"><p className="truncate w-[250px]">Customer Name</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[200px]">Phone Number</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Address</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Register Date</p></th>
                                    <th className="px-3 py-4 text-start"><p className="truncate w-[50px]"></p></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    customerData.map((val, key) => {
                                        return (
                                            <tr className="odd:bg-[#F9F9F9] border-t-8 border-t-white" key={key}>
                                                <td className="px-3 py-4 text-center"><p>{key+1}</p></td>
                                                <td className="px-6 py-4"><p className="truncate w-[250px]">{val.lastname} {val.firstname}</p></td>
                                                <td className="px-3 py-4"><p className="truncate w-[200px]">{val.phoneNumber}</p></td>
                                                <td className="px-3 py-4 "><p className="truncate w-[150px]">{val.homeAddress}</p></td>
                                                <td className="px-3 py-4"><p className="truncate w-[150px] font-medium">{val.registrationDate}</p></td>
                                                <td className="px-3 py-4 hover:scale-105"><Link to={''}><span className="truncate w-[50px] bg-primary text-white text-xs font-medium text-center rounded-full py-2 px-3">View</span></Link></td>
                                            </tr>
                                        )
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                )
                : (
                    <div className="grid gap-4 my-16">
                        <div className="w-full grid justify-center">
                            <img src={noCustomerImage} alt="" />
                        </div>
                        <p className="text-center text-lg font-semibold text-primary">No Customer Available yet</p>
                    </div>
                )
            }

        </div>
    )
}
export default Customer;