import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import { useInvestmentTypeList, useInvestmentTypes } from "../userLayout/reusableEffects";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";

const Investment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);

    const investmentTypes = useInvestmentTypes();
    const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);
    const [selectedInvestmentName, setSelectedInvestmentName] = useState(null);
    const investmentTypeDetails = useInvestmentTypeList(selectedInvestmentType);
    useEffect(() => {
        if (investmentTypes.length > 0) {
            setSelectedInvestmentType(investmentTypes[0].investmentTypeId);
            setSelectedInvestmentName(investmentTypes[0].investmentName);
        }
    }, [investmentTypes])

    const userSelectedInvestmentType =(investmentTypeId, investmentTypeName)=>{
        setSelectedInvestmentName(investmentTypeName);
        setSelectedInvestmentType(investmentTypeId);
    }
    return (
        <div className="col-span-10 bg-white px-5 rounded-lg">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <NavigationHeader title={'Investments'} />
            {investmentTypes.length > 0
                ? (
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-0 pt-6">
                            <div>
                                <p className="text-primary text-lg font-semibold">Choose an investment</p>
                                <p className="text-sm">Select from list investment available</p>
                            </div>
                            <div className="justify-end flex">
                            </div>
                            <div id="tabs" className="flex gap-3 text-sm text-white md:mt-8">
                                {investmentTypes.map((val, key) => {
                                    return (
                                        <button className={`tab-btn active px-6 py-2 rounded bg-primary ${selectedInvestmentType === val.investmentTypeId ? 'opacity-50' : ''}`} onClick={() => userSelectedInvestmentType(val.investmentTypeId, val.investmentName)} key={key}>{val.investmentName} </button>
                                    )
                                })}
                            </div>
                        </div>
                        {selectedInvestmentType && (
                            <div className="tab-content p-3 md:p-5 rounded-md">
                                {investmentTypeDetails.length > 0
                                    ?
                                    (
                                        <div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <div className="grid gap-4 my-16">
                                                <div className="w-full grid justify-center">
                                                    <img src={comingSoon} alt="" />
                                                </div>
                                                <p className="text-center text-lg font-semibold text-primary">No Investment available yet for {selectedInvestmentName}</p>
                                                <p className="text-center">We are working round the clock to serve you better by introducing great features. <br /> Stay tuned.</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        )}

                    </div>
                )
                : (
                    <div id="" className="">
                        <div className="grid gap-4 my-16">
                            <div className="w-full grid justify-center">
                                <img src={comingSoon} alt="" />
                            </div>
                            <p className="text-center text-lg font-semibold text-primary">No Investment Available yet</p>
                            <p className="text-center">We are working round the clock to serve you better by introducing great features. <br /> Stay tuned.</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Investment;