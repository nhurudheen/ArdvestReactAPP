import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSingleInvestmentDetails } from "../userLayout/reusableEffects";
import { showErrorToastMessage } from "../../../Utils/constant";
import Modal from "../../../Components/modals";
import Buttons from "../../../Components/buttons";
import { useFormik } from "formik";
import bankSvg from "../../../assets/icons/bank.svg";
import arrowSvg from "../../../assets/icons/greenArrow.svg";
import cardSvg from "../../../assets/icons/card.svg";
import copyIcon from "../../../assets/icons/copyIcon.svg";
import { userBookInvestment, userInvestmentList } from "../../../hooks/local/userReducer";
import CurrencyInput from "../../../Components/currencyInput";
import DigitInput from "../../../Components/digitInput";

const SingleInvestment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);
    let { investmentId } = useParams();
    investmentId = atob(investmentId);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [stockModal, setStockModal] = useState(false);
    const [paymentModal, setPaymentModal] = useState(false);
    const [bankTransferModal, setBankTransferModal] = useState(false);
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
        initialValues: {
            userId: userId,
            amount: totalAmount,
            investmentId: investmentId
        },
        onSubmit: async (values) => {
            const { userId, amount, investmentId } = values;
            let bookInvestmentData = { userId, amount, investmentId };
            const { payload } = await dispatch(userBookInvestment(bookInvestmentData))
            if (payload.statusCode === "200") {
                await dispatch(userInvestmentList(userId));
                navigate("/investment")
            }
            else {
                setStockModal(false);
            }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid col-span-1">
                        <span className="text-sm font-medium text-primary">Minimum Amount:</span>
                        <input type="text" name="" id="amount" className="p-3 bg-[#f8f8f8] border text-sm rounded placeholder:text-xs" readOnly value={investmentData.minimumInvestment} />
                    </div>
                    <div className="grid col-span-1">
                        <span className="text-sm font-medium text-primary">Quantity:</span>
                        <input type="number"
                            name=""
                            className="p-3 bg-[#f8f8f8] text-primary border text-sm rounded placeholder:text-xs"
                            placeholder="1"
                            onChange={(e) => {
                                setQuantity(parseInt(e.target.value))
                            }} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 justify-center">
                    <button className="col-span-12 md:col-span-9 bg-primary text-center p-4 text-sm rounded text-white" id="buyStock" onClick={buyStock}>Buy stock</button>
                    <span className="w-full col-span-12 md:col-span-3"><Link to={'/investment'}><button className="border border-primary text-center p-4 text-sm rounded text-primary w-full">Cancel</button></Link></span>
                </div>

                <Modal isVisible={stockModal} onClose={() => setStockModal(false)}>
                    <p className="text-xl text-primary font-medium">Payment summary</p>
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
                    <Buttons onClick={() => { setPaymentModal(true); setStockModal(false) }} btnText={'Pay Now'} btnType={'primary'} />
                </Modal>

                <Modal isVisible={paymentModal} onClose={() => { setPaymentModal(false); setStockModal(true) }}>
                    <p className="text-xl text-primary font-medium">Choose a payment method</p>
                    <div className="grid gap-4 text-sm mt-4 mb-8">
                        <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5" onClick={() => { setBankTransferModal(true); setPaymentModal(false) }}>
                            <span className="flex items-center gap-4">
                                <img src={bankSvg} alt="" />
                                <p>Bank transfer</p>
                            </span>
                            <span><img src={arrowSvg} alt="" /></span>
                        </button>
                        <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5"
                            onClick={''}>
                            <span className="flex items-center gap-4">
                                <img src={cardSvg} alt="" />
                                <div className="flex items-center">
                                    <span>Card</span>
                                    <span className="mx-2 mb-[1px]">
                                        <span className="rounded-3xl bg-primary/10 text-primary text-[8px] py-1 px-2">Coming Soon</span>
                                    </span>
                                </div>
                            </span>
                            <span><img src={arrowSvg} alt="" /></span>
                        </button>
                    </div>

                </Modal>

                <Modal isVisible={bankTransferModal} onClose={() => { setBankTransferModal(false); setPaymentModal(true) }}>
                    <p className="text-primary font-semibold text-xl">Make Investment</p>
                    <p className="text-sm font-normal text-ash_header_color">Ensure the Reference Number is used as Payment description</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 pt-8">
                        <div className="grid">
                            <span className="text-ash_text_color text-xs">Account Name</span>
                            <span className="text-primary font-semibold text-base">Fooding Trading Limited</span>
                        </div>
                        <div className="grid">
                            <span className="text-ash_text_color text-xs">Bank Name</span>
                            <span className="text-primary font-semibold text-base">Providus Bank</span>
                        </div>
                        <div className="flex justify-between bg-ash_color items-center ps-3 py-1 rounded-lg">
                            <div className="grid">
                                <span className="text-ash_text_color text-xs">Account Number</span>
                                <span className="text-primary font-semibold text-base">9908393938</span>
                            </div>
                            <div className="hover:scale-105">
                                <img src={copyIcon} alt="" className=" w-2/3" onClick={''} />
                            </div>

                        </div>
                        <div className="flex justify-between bg-ash_color items-center ps-3 py-1 rounded-lg">
                            <div className="grid">
                                <span className="text-ash_text_color text-xs">Reference Number</span>
                                <span className="text-primary font-semibold text-base">9908393938</span>
                            </div>
                            <div className="hover:scale-105">
                                <img src={copyIcon} alt="" className="w-2/3" onClick={''} />
                            </div>

                        </div>
                        <div>
                            <CurrencyInput labelName={'Enter Amount'}
                                inputType={'text'} />
                        </div>
                        <div>
                            <DigitInput labelName={'Reference Number Used'} />
                        </div>
                        <div className="grid">
                            <span className="text-sm font-medium pb-1 text-primary">Proof of Payment:</span>
                            <input type='file' className="p-3 bg-[#f8f8f8] border text-sm rounded"  id="fileInput" onChange={''} />
                            {/* {selectedFileError && (<code className="text-red-500 text-xs">Upload proof of payment to complain deposit</code>)} */}
                        </div>
                        <div className="mt-6">
                            <Buttons btnText={'Make payment'} btnType={'primary'} />
                        </div>

                    </div>
                </Modal>


            </div >
        </div >
    );
}

export default SingleInvestment;