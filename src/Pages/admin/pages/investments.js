import { useEffect } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import Buttons from "../../../Components/buttons";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import investmentIcon from "../../../assets/images/money.png"
import arrowIcon from "../../../assets/icons/arrow2.svg";
const Investment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);
    const investmentTypeList = useSelector((state) => state.admin.investmentTypes);
    console.log(investmentTypeList);
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <div className="md:flex md:justify-between">
                <NavigationHeader title={'Available Investments'} />
                <div className="mt-4 md:mt-0">
                    <Buttons btnText={'Create New Investment'} btnType={'primary'} onClick={''} />
                </div>
            </div>
            {
                investmentTypeList.length > 0
                    ? (
                        <div class="grid gap-4 mt-12 md:grid-cols-2">
                            {investmentTypeList.map((val, key) => {
                                return (
                                        <div class="hover:bg-primary/20 bg-[#F5F5F5] py-4 px-4 md:px-8 rounded-lg flex gap-4 items-center" key={key}>
                                            <img src={investmentIcon} alt="" class="aspect-ratio w-8 h-8"/>
                                            <div class="flex justify-between w-full items-center">
                                                <p class="truncate overflow-hidden font-semibold text-md">{val.investmentName}</p>
                                                <img src={arrowIcon} alt="" class="h-3"/>
                                            </div>
                                        </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        <div className="grid gap-4 my-16">
                            <div className="w-full grid justify-center">
                                <img src={comingSoon} alt="" />
                            </div>
                            <p className="text-center text-lg font-semibold text-primary">No Investment Available yet</p>
                        </div>
                    )
            }
        </div>
    );
}

export default Investment;