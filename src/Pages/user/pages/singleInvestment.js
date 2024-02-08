import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSingleInvestmentDetails } from "../userLayout/reusableEffects";
import { showErrorToastMessage } from "../../../Utils/constant";
import Modal from "../../../Components/modals";
import Buttons from "../../../Components/buttons";
import { useFormik } from "formik";

const SingleInvestment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);
    let { investmentId } = useParams();
    investmentId = atob(investmentId);
    const [quantity, setQuantity] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [stockModal, setStockModal] = useState(false);
    const investmentData = useSingleInvestmentDetails(investmentId);
    const userId = useSelector((state) => state.user.userSessionData).userId;
    const minimumInvestment = investmentData.minimumInvestment ? parseFloat(investmentData.minimumInvestment.replace(/,/g, '')) : 0;
    const totalQuantity = () => {
        return quantity * minimumInvestment;
    }
    const buyStock = () => {
        if (quantity > 0) {
            setStockModal(true);
            setTotalAmount(totalQuantity());
        }
        else {
            showErrorToastMessage("Kindly Specify Quantity to buy");
        }
    }
    
    const bookInvestment = useFormik({
        initialValues : {
            userId: userId,
            amount : totalAmount,
            investmentId: investmentId
        },
        onSubmit: async(values)=>{
            console.log(values);
        }
    })
    useEffect(() => {
        bookInvestment.setFieldValue('amount', totalAmount);
    }, [totalAmount]);
    return (
        <div className="col-span-10 bg-white px-5 rounded-lg">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <NavigationHeader title={'Book Investment'} />

            <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-8 pt-4">
                <div className="object-cover object-center rounded-lg col-span-12 md:col-span-5 w-full h-52 overflow-hidden">
                    <img src={investmentData.investmentImage} alt="" />
                </div>
                <div className="col-span-12 md:col-span-7 my-auto">
                    <p className="text-3xl text-primary font-medium">{investmentData.investmentName}</p>
                    <p className="mb-5">{investmentData.investmentTypeName}</p>
                    <div className="flex justify-between">
                        <div>
                            <p className="font-bold">Minimum Investment</p>
                            <p className="text-primary font-medium text-lg">&#8358;{investmentData.minimumInvestment}</p>
                        </div>
                        <div>
                            <p className="font-bold">Maximum Investment</p>
                            <p className="text-primary font-medium text-lg">&#8358;{investmentData.maximumInvestment}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="grid gap-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className="grid col-span-2">
                        <span className="text-sm font-medium">Minimum Amount:</span>
                        <input type="text" name="" id="amount" className="p-3 bg-[#f8f8f8] border text-sm rounded placeholder:text-xs" readOnly value={investmentData.minimumInvestment} />
                    </div>
                    <div className="grid col-span-2">
                        <span className="text-sm font-medium">Quantity:</span>
                        <input type="number"
                            name=""
                            className="p-3 bg-[#f8f8f8] border text-sm rounded placeholder:text-xs"
                            placeholder="1"
                            onChange={(e) => {
                                setQuantity(parseInt(e.target.value))
                            }} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 justify-center">
                    <button className="col-span-12 md:col-span-3 bg-primary text-center p-4 text-sm rounded text-white" id="buyStock" onClick={buyStock}>Buy stock</button>
                    <span className="w-full col-span-12 md:col-span-1"><Link to={'/investment'}><button className="border border-primary text-center p-4 text-sm rounded text-primary w-full">Cancel</button></Link></span>
                </div>

                <Modal isVisible={stockModal} onClose={() => setStockModal(false)}>
                    <p className="text-xl text-primary font-medium">Investment summary</p>
                    <img src={investmentData.investmentImage} alt="" className=" h-48 w-full rounded-lg my-4 object-cover" />
                    <div className="grid gap-4 text-sm text-black/50 mt-4 mb-8">
                        <div className="flex justify-between pb-2 border-b">
                            <p>Stock breed</p>
                            <p className="font-semibold">{investmentData.investmentName}</p>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <p>Quantity</p>
                            <p className="font-semibold"><span id="unit"></span>{quantity} units</p>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <p>Stock amount (per unit)</p>
                            <p className="font-semibold">&#8358;<span>{investmentData.minimumInvestment}</span></p>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <p>Stock amount (total)</p>
                            <p className="font-semibold" id="stockAmount">&#8358;{totalQuantity().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                    <form onSubmit={bookInvestment.handleSubmit}>
                    <Buttons type={'submit'} btnText={'Invest Now'} btnType={'primary'} />
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default SingleInvestment;