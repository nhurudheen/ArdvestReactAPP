import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import { useInvestmentTypeList, useInvestmentTypes } from "../userLayout/reusableEffects";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import Modal from "../../../Components/modals";
import { Link } from "react-router-dom";

const Investment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);

    const investmentTypes = useInvestmentTypes();
    const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);
    const [selectedInvestmentName, setSelectedInvestmentName] = useState(null);
    const [selectedInvestmentDetails, setSelectedInvestmentDetails] = useState(null);
    const investmentTypeDetails = useInvestmentTypeList(selectedInvestmentType);
    useEffect(() => {
        if (investmentTypes.length > 0) {
            setSelectedInvestmentType(investmentTypes[0].investmentTypeId);
            setSelectedInvestmentName(investmentTypes[0].investmentName);
        }
    }, [investmentTypes])

    const userSelectedInvestmentType = (investmentTypeId, investmentTypeName) => {
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
                                        <button className={`tab-btn active px-6 py-2 rounded bg-primary ${selectedInvestmentType === val.investmentTypeId ? '' : 'opacity-50'}`} onClick={() => userSelectedInvestmentType(val.investmentTypeId, val.investmentName)} key={key}>{val.investmentName} </button>
                                    )
                                })}
                            </div>
                        </div>
                        {selectedInvestmentType && (
                            <div className="tab-content p-3 md:p-5 rounded-md">
                                {investmentTypeDetails.length > 0
                                    ?
                                    (<div>
                                        {investmentTypeDetails.map((val, key) => {
                                            return (
                                                <div className="grid md:flex justify-between items-center bg-[#f8f8f8] px-4 py-6 rounded mb-6 gap-8" key={key}>
                                                    <div className="flex items-center gap-3">
                                                        <img src={val.investmentImage} alt="" className="rounded-[50px] h-20 w-20" />
                                                        <div className="grid">
                                                            <span className="text-lg font-semibold text-primary">{val.investmentName}</span>
                                                            <span className={`text-sm ${(val.status === 'Active') ? 'text-primary/50' : 'text-red-500'} font-medium`}>{val.status} </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 md:flex gap-4">
                                                        <div>
                                                            <button className="text-sm px-6 py-3 rounded-md bg-primary text-white w-full" onClick={()=>setSelectedInvestmentDetails(val)}>{(val.status === 'Active') ? 'Invest Now' : 'View More'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
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

                        {
                            selectedInvestmentDetails && (
                                <div>
                                    <Modal isVisible={selectedInvestmentDetails !== null} onClose={()=>setSelectedInvestmentDetails(null)}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="rounded-lg overflow-hidden">
                                                <img src={selectedInvestmentDetails.investmentImage} alt="" className="h" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-primary">{selectedInvestmentDetails.investmentName}</p>
                                                <p className="text-sm text-[#c4c4c4] text-justify">{selectedInvestmentDetails.description}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-1 md:flex justify-between text-[#c4c4c4] mt-6 gap-y-3">
                                            <div>
                                                <p className="text-xs text-black">Current investors</p>
                                                <p className="font-semibold text-black">{selectedInvestmentDetails.noOfPeople}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black">Minimum Investment</p>
                                                <p className="font-semibold text-black">&#8358;{selectedInvestmentDetails.minimumInvestment}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black">Maximum Investment</p>
                                                <p className="font-semibold text-black">&#8358;{selectedInvestmentDetails.maximumInvestment}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-1 md:flex justify-between text-[#c4c4c4] mt-6 gap-y-3">
                                            <div>
                                                <p className="text-xs text-black">ROI</p>
                                                <p className="font-semibold text-black">{selectedInvestmentDetails.roi} %</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black">Start Date</p>
                                                <p className="font-semibold text-black">&#8358;{selectedInvestmentDetails.startDate}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black">End Date</p>
                                                <p className="font-semibold text-black">&#8358;{selectedInvestmentDetails.endDate}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm mt-4 m-8">Investment Status: <span className={`font-semibold ${(selectedInvestmentDetails.status === 'Active') ? 'text-primary/50' : 'text-red-500'}`}>{selectedInvestmentDetails.status}</span></p>
                                        {(selectedInvestmentDetails.status === 'Active')
                                            ? <Link to={`/invest_now/${btoa(selectedInvestmentDetails.id)}`}><button class='bg-primary text-center p-4 text-sm rounded text-white w-full'>Invest now</button></Link> : ''}

                                    </Modal>
                                </div>
                            )
                        }
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
        </div >
    );
}

export default Investment;