import { useEffect, useRef, useState } from "react";
import { copyToClipboard, currencyFormat, getPeriodOfDay } from "../../../Utils/utils";
import eyeIcon from "../../../assets/icons/eye.svg";
import plusIcon from "../../../assets/icons/deposit.svg";
import withdrawIcon from "../../../assets/icons/withdraw.svg";
import bannerImg from "../../../assets/images/banner.png";
import creditSvg from "../../../assets/icons/credit.svg";
import bankSvg from "../../../assets/icons/bank.svg";
import arrowSvg from "../../../assets/icons/arrow2.svg";
import cardSvg from "../../../assets/icons/card.svg";
import debitSvg from "../../../assets/icons/debit.svg";
import Modal from "../../../Components/modals";
import copyIcon from "../../../assets/icons/copyIcon.svg";
import pieChartIcon from "../../../assets/icons/pie-chart-line.svg";
import plantLineIcon from "../../../assets/icons/plant-line.svg";
import InputWithLabel from "../../../Components/inputWithLabel";
import Buttons from "../../../Components/buttons";
import SelectInput from "../../../Components/selectInput";
import CurrencyInput from "../../../Components/currencyInput";
import DigitInput from "../../../Components/digitInput";
import { useDispatch, useSelector } from "react-redux";
import { useDepositBankList, useUserActiveInvestmentList, useUserBalanceSummary, useUserTransactionHistory } from "../userLayout/reusableEffects";
import Spinner from "../../../Components/spinner";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { bankDepositAddFund, userWithdrawal } from "../../../hooks/local/userReducer";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ setPageTitle }) => {
  const fileInputRef =  useRef(null);
  const userId= useSelector((state) =>state.user.userSessionData).userId;
  const [timeOfTheDay, setTimeOfTheDay] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [depositModal, setDepositModal] = useState(false);
  const [bankPayment, setBankPayment] = useState(false);
  const [cardPayment, setCardPayment] = useState(false);
  const [userPaymentReceipt, setUserPaymentReceipt] = useState(null);
  const [selectedFileError, setSelectedFileError] = useState(false);
  const [depositConfirmation, setDepositConfirmation] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [portfolioBalanceModal, setPortfolioBalanceModal] = useState(false);
  const [investmentBalanceModal, setInvestmentBalanceModal] = useState(false);
  const depositBankDetails = useDepositBankList();
  const userActiveInvestmentList = useUserActiveInvestmentList();
  const userTransactionHistory = useUserTransactionHistory().slice(0,5);
  const userBalanceSummary = useUserBalanceSummary();
  const dashboardBalance = userBalanceSummary?.totalBalance? currencyFormat(userBalanceSummary.totalBalance) : '0.00';
  const portfolioBalance = userBalanceSummary?.totalBalance? userBalanceSummary.totalBalance : '0.00';
  const investmentBalance = userBalanceSummary?.investmentBalance? userBalanceSummary.investmentBalance : '0.00';
  const activeInvestment = userActiveInvestmentList.map((response) => ({ amount: response.amount, investmentId:response.id, label: `${response.investmentName} (${response.amount})` }));

  useEffect(() => {
    setPageTitle("Dashboard");
    document.title = "Dashboard | Ardvest";
    document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    setTimeOfTheDay(getPeriodOfDay);

  }, [setPageTitle]);

  const handleProofPaymentFile =(e) =>{
      const file =e.target.files[0];
      if(file){
        setUserPaymentReceipt(file);
        setSelectedFileError(false);
      }
      else{
        e.target.value = null;
        setSelectedFileError(true);
      }
  }

  const depositBankTransfer = useFormik({
    initialValues : {
      amount : "",
      referenceId :""
    },
    validationSchema: Yup.object({
      amount : Yup.string().required("Amount cannot be empty"),
      referenceId:  Yup.string().required("Reference Id cannot be empty")
    }),
    onSubmit : async(values, {resetForm})=>{
      if(!userPaymentReceipt){
        setSelectedFileError(true);
        return;
      }
      const proofOfPayment = userPaymentReceipt;
      const channel ="Bank Transfer";
      const  {amount, referenceId} = values;
      let bankDepositData = {amount,referenceId, proofOfPayment, channel,userId};
      const { payload } = await dispatch(bankDepositAddFund(bankDepositData));
      if(payload.statusCode === "200"){
        resetForm();
        setDepositConfirmation(false);
        navigate("/transactions")
      }
    }
  })

  const portfolioBalanceWithdrawal = useFormik({
    initialValues : {
      amount : "",
      userPin :""
    },
    validationSchema: Yup.object({
      amount : Yup.string().required("Amount cannot be empty"),
      userPin:  Yup.string().required("UserPin cannot be empty")
    }),
    onSubmit : async(values, {resetForm})=>{
      const channel ="Portfolio Balance";
      const  {amount, userPin} = values;
      let withdrawalData = {amount,userPin, channel,userId};
      const { payload } = await dispatch(userWithdrawal(withdrawalData));
      if(payload.statusCode === "200"){
        resetForm();
        setPortfolioBalanceModal(false);
        setWithdrawalModal(false)
        navigate("/transactions")
      }
    }
  })

  const investmentBalanceWithdrawal = useFormik({
    initialValues : {
      amount : "",
      userPin :"",
      userInvestmentId: ""
    },
    validationSchema: Yup.object({
      amount : Yup.string().required("Amount cannot be empty"),
      userPin:  Yup.string().required("UserPin cannot be empty"),
      userInvestmentId : Yup.string().required("Kindly select an investment you want to withdraw from")
    }),
    onSubmit : async(values, {resetForm})=>{
      const channel ="Investment Balance";
      const  {amount, userPin, userInvestmentId} = values;
      let withdrawalData = {amount,userPin, channel,userId, userInvestmentId};
      const { payload } = await dispatch(userWithdrawal(withdrawalData));
      if(payload.statusCode === "200"){
        resetForm();
        setPortfolioBalanceModal(false);
        setWithdrawalModal(false)
        navigate("/transactions")
      }
    
    }
  })

  return (
    
    <div className="col-span-10 md:mx-4">
      <Spinner loading={useSelector((state)=>state.user).loading}/>
      <p>Good {timeOfTheDay}<span id="time-period"></span>, <span className="font-semibold">{useSelector((state) => state.user.userSessionData).firstname}</span></p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid gap-4">
          <div className="p-4 bg-white rounded-md grid">
            <button className="flex items-center bg-primary/10 px-4 py-2 rounded-full justify-self-end" onClick={() => { setShowBalance(!showBalance) }}>
              <img src={eyeIcon} alt="" />
              <span className="text-xs text-primary font-medium">{showBalance ? 'Hide Balance' : 'Show balance'}</span>
            </button>
            <p className="text-sm mt-6">Portfolio Balance:</p>
            <p className="text-2xl text-primary">
              <span>&#8358;</span>
              {showBalance ?
                (<><span className="text-5xl font-medium">{dashboardBalance.wholeNumber}</span>.<span>{dashboardBalance.decimalPart}</span></>)
                : (<span className="text-5xl font-medium">*,***,***.**</span>)
              }
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <button onClick={() => { setDepositModal(true) }} className="bg-primary flex w-full justify-center gap-4 items-center text-white rounded-md p-3">
                <img src={plusIcon} alt="" />
                <span>Deposit</span>
              </button>
            </div>
            <div>
              <button onClick={() => { setWithdrawalModal(true) }} className="bg-brandyellow flex w-full justify-center gap-4 items-center text-white rounded-md p-3">
                <img src={withdrawIcon} alt="" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="relative mt-10 md:mt-0 md:mb-0 mb-5">
            <img src={bannerImg} alt="" className="rounded-md border w-full" />
            <div className="grid grid-cols-2 absolute top-0 p-8">
              <div>
                <p className="col-span-1 text-2xl md:text-3xl font-semibold mb-8">Invest in what you eat</p>
                <span className=" rounded-md bg-primary py-4 px-8 text-sm text-white">Start now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-6">
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium">Articles</p>
            <span className="text-primary font-medium underline">View all</span>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-md">
              <img src="https://img.freepik.com/free-photo/herd-cows-grazing-pasture-during-daytime_181624-28680.jpg?w=900&t=st=1699538158~exp=1699538758~hmac=2d6a736f950aa1251ba2d88a2c25df923ca0b91bc9cf3813eacd088d052f98b3" alt="" className="aspect-square rounded-md object-cover" />
              <p className="capitalize font-medium mt-3 mb-2 truncate">The daily pasture rotation</p>
              <p className="text-sm h-11 overflow-hidden ">The seven core rules of successful grazing management</p>
              <span className="flex gap-2 my-2">
                <p className="text-sm underline">Keep reading</p>
                <img src="/assets/icons/arrow2.svg" alt="" />
              </span>
            </div>
            <div className="bg-white p-3 rounded-md">
              <img src="https://img.freepik.com/free-photo/herd-cows-grazing-pasture-during-daytime_181624-28680.jpg?w=900&t=st=1699538158~exp=1699538758~hmac=2d6a736f950aa1251ba2d88a2c25df923ca0b91bc9cf3813eacd088d052f98b3" alt="" className="aspect-square rounded-md object-cover" />
              <p className="capitalize font-medium mt-3 mb-2 truncate">The daily pasture rotation</p>
              <p className="text-sm h-11 overflow-hidden ">The seven core rules of successful grazing management</p>
              <span className="flex gap-2 my-2">
                <p className="text-sm underline">Keep reading</p>
                <img src="/assets/icons/arrow2.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium">Recent transactions</p>
            <span className="text-primary font-medium underline">View all</span>
          </div>
          <div className="bg-white px-4 py-8 rounded-md mt-4 grid gap-4">
            {
              userTransactionHistory.length > 0 ?
              userTransactionHistory.map((val, key) => {
                const transactionIcon = (val.transactionType === "Deposit") ? creditSvg : debitSvg;
                const statusColor = (val.status === "Approved") ? 'text-primary' : 'text-red-500';
                return (
                  <div key={key} className="flex gap-4 ">
                    <div><img src={transactionIcon} alt="" /></div>
                    <div className="grid grid-cols-12 w-full font-medium text-sm items-center border-b">
                      <div className="col-span-6 md:col-span-4 text-start">{val.transactionType}</div>
                      <div className="col-span-6 md:col-span-3 text-start">{val.insertedDt}</div>
                      <div className="hidden md:block col-span-3 text-center">&#8358;<span>{val.amount}</span></div>
                      <div className={`${statusColor} font-bold hidden md:block col-span-2 text-end`}>{val.status}</div>
                    </div>
                  </div>
                )
              })
              :
              (
                <div className="text-center pt-3 text-lg font-bold">No Transaction Available</div>
              )
            }


          </div>
        </div>
      </div>


      <Modal isVisible={depositModal} onClose={() => { setDepositModal(false) }}>
        <p className="text-xl text-primary font-medium">Choose a payment method</p>
        <div className="grid gap-4 text-sm mt-4 mb-8">
          <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5"
            onClick={() => { setBankPayment(true) }}>
            <span className="flex items-center gap-4">
              <img src={bankSvg} alt="" />
              <p>Bank transfer</p>
            </span>
            <span><img src={arrowSvg} alt="" /></span>
          </button>
          <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5"
            onClick={() => { setCardPayment(true); setDepositModal(false) }}>
            <span className="flex items-center gap-4">
              <img src={cardSvg} alt="" />
              <p>Card</p>
            </span>
            <span><img src={arrowSvg} alt="" /></span>
          </button>
        </div>
      </Modal>

      <Modal isVisible={bankPayment} onClose={() => { setBankPayment(false) }}>
        <p className="text-xl text-primary font-medium">Kindly Make Payment to this account</p>
        <p className="text-red-500 font-semibold">Ensure the Reference Number is used as Payment Description</p>
        <div className="grid gap-4 text-sm mt-4 mb-8">
          <div className="grid bg-[#f8f8f8] p-3 rounded-lg">
            <p className="text-sm text-black/50">Account name:</p>
            <p className="text-lg font-medium text-primary">{depositBankDetails?.accountName ? depositBankDetails.accountName : ''}</p>
          </div>
          <div className="grid bg-[#f8f8f8] p-3 rounded-lg">
            <p className="text-sm text-black/50">Bank name:</p>
            <p className="text-lg font-medium text-primary">{depositBankDetails?.bankName ? depositBankDetails.bankName : ''}</p>
          </div>
          <div className="flex justify-between items-end bg-[#f8f8f8] p-3 rounded-lg">
            <div>
              <p className="text-sm text-black/50">Account number:</p>
              <p className="text-lg font-medium text-primary" >
                {depositBankDetails.accountNumber}</p>
            </div>
            <div className="pt-3 pe-4 hover:scale-105"> <img
              src={copyIcon} alt=""
              className="justify-self-end mb-4" onClick={() => { copyToClipboard(depositBankDetails?.accountNumber ? depositBankDetails.accountNumber : '') }} /></div>
          </div>
          <div className="flex justify-between items-end bg-[#f8f8f8] p-3 rounded-lg">
            <div>
              <p className="text-sm text-black/50">Reference Number:</p>
              <p className="text-lg font-medium text-primary" >
                {depositBankDetails.referenceNumber}</p>
            </div>
            <div className="pt-3 pe-4 hover:scale-105"> <img
              src={copyIcon} alt=""
              className="justify-self-end mb-4" onClick={() => { copyToClipboard(depositBankDetails?.referenceNumber ? depositBankDetails.accountNumber : '') }} /></div>
          </div>
        </div>
        <button onClick={() => { setDepositConfirmation(true); setBankPayment(false); setDepositModal(false) }} className="bg-primary p-4 rounded text-white text-sm">Continue</button>
      </Modal>

      <Modal isVisible={cardPayment} onClose={() => { setCardPayment(false); setDepositModal(true) }}>
        <p className="text-xl text-primary py-16 text-center font-bold">Card Payment Options is not
          available for now, <br />Kindly Use Bank Transfer</p>
      </Modal>
  
      <Modal isVisible={depositConfirmation} onClose={() => { setDepositConfirmation(false) }}>
        <p className="text-xl text-primary font-medium">Complete the form to confirm your deposit</p>
        <form className="grid gap-6 mt-8" onSubmit={depositBankTransfer.handleSubmit}>
          <CurrencyInput labelName={'Amount'}
                        inputType={'text'}
                        placeholder={'000,000.00'}
                        inputName={'amount'}
                        inputValue={depositBankTransfer.values.amount}
                        inputOnBlur={depositBankTransfer.handleBlur}
                        inputOnChange={depositBankTransfer.handleChange}
                        inputError={depositBankTransfer.errors.amount && depositBankTransfer.touched.amount ? depositBankTransfer.errors.amount : null} />
          <InputWithLabel labelName={'Reference Number'}
                          inputType={'number'}
                          placeholder={'00000000'}                         
                          inputName={'referenceId'}
                          inputValue={depositBankTransfer.values.referenceId}
                          inputOnBlur={depositBankTransfer.handleBlur}
                          inputOnChange={depositBankTransfer.handleChange}
                          inputError={depositBankTransfer.errors.referenceId && depositBankTransfer.touched.referenceId ? depositBankTransfer.errors.referenceId : null} />
        <div className="grid">
            <span className="text-sm font-medium pb-1">Proof of Payment:</span>
            <input type='file' className="p-3 bg-[#f8f8f8] border text-sm rounded" ref={fileInputRef} id="fileInput" onChange={handleProofPaymentFile}  />
            { selectedFileError && (<code className="text-red-500 text-xs">Upload proof of payment to complain deposit</code>) }
        </div>
          <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
        </form>


      </Modal>

      <Modal isVisible={withdrawalModal} onClose={() => { setWithdrawalModal(false) }}>
        <p className="text-xl text-primary font-medium">Choose an Account</p>
        <p className="text-sm text-black/50 font-medium mb-5">Select a balance you wish to initiate withdrawal from</p>
        <div className="grid gap-4 text-sm mt-4 mb-8">
          <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5"
            onClick={() => { setPortfolioBalanceModal(true); setWithdrawalModal(false) }}>
            <span className="flex items-center gap-4">
              <img src={pieChartIcon} alt="" />
              <p>Portfolio Balance <span className="font-bold ps-2">(&#8358;{portfolioBalance})</span></p>
            </span>
            <span><img src={arrowSvg} alt="" /></span>
          </button>
          <button className="w-full flex justify-between items-center bg-[#F5F5F5] rounded-lg p-5"
            onClick={() => { setInvestmentBalanceModal(true); setWithdrawalModal(false) }}>
            <span className="flex items-center gap-4">
              <img src={plantLineIcon} alt="" />
              <p>Investment Balance <span className="font-bold ps-2">(&#8358;{investmentBalance})</span></p>
            </span>
            <span><img src={arrowSvg} alt="" /></span>
          </button>
        </div>
      </Modal>

      <Modal isVisible={portfolioBalanceModal} onClose={() => { setPortfolioBalanceModal(false); setWithdrawalModal(true) }}>
        <p className="text-xl text-primary font-medium">Complete the form to confirm your withdrawal from your Portfolio Balance</p>
        <p className="text-sm text-red-500 font-medium mb-5">Kindly Note that withdrawal will be made to the account set up in your profile</p>
        <form className="grid gap-6 mt-4" onSubmit={portfolioBalanceWithdrawal.handleSubmit}>
          <CurrencyInput labelName={'Amount'}
                        inputType={'text'}
                        placeholder={'000,000.00'}
                        inputName={'amount'}
                        inputOnChange={portfolioBalanceWithdrawal.handleChange}
                        inputOnBlur={portfolioBalanceWithdrawal.handleBlur}
                        inputValue={portfolioBalanceWithdrawal.values.amount}
                        inputError={portfolioBalanceWithdrawal.errors.amount && portfolioBalanceWithdrawal.touched.amount ?portfolioBalanceWithdrawal.errors.amount : null} />
          <DigitInput labelName={'User Pin'}
                      maxLength={'4'}
                      inputType={'password'}
                      inputName={'userPin'}
                      inputOnChange={portfolioBalanceWithdrawal.handleChange}
                      inputOnBlur={portfolioBalanceWithdrawal.handleBlur}
                      inputValue={portfolioBalanceWithdrawal.values.userPin}
                      inputError={portfolioBalanceWithdrawal.errors.userPin && portfolioBalanceWithdrawal.touched.userPin ?portfolioBalanceWithdrawal.errors.userPin : null} />
          <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'}/>
        </form>
      </Modal>

      <Modal isVisible={investmentBalanceModal} onClose={() => { setInvestmentBalanceModal(false); setWithdrawalModal(true) }}>
        <p className="text-xl text-primary font-medium">Complete the form to confirm your withdrawal from your Investment Balance</p>
        <p className="text-sm text-red-500 font-medium mb-5">Kindly Note that withdrawal will be made to the account set up in your profile</p>
        <form className="grid gap-6 mt-4" onSubmit={investmentBalanceWithdrawal.handleSubmit}>
          <SelectInput labelName={'Select Investment you want to withdraw from'}
                      selectOptions={activeInvestment}
                      valueKey={'investmentId'}
                      labelKey={'label'} 
                      selectValue={investmentBalanceWithdrawal.values.userInvestmentId}
                      selectBlur={investmentBalanceWithdrawal.handleBlur}
                      onChange={(event) => investmentBalanceWithdrawal.setFieldValue('userInvestmentId', event.target.value)}
                      selectError={investmentBalanceWithdrawal.touched.userInvestmentId && investmentBalanceWithdrawal.errors.userInvestmentId ? investmentBalanceWithdrawal.errors.userInvestmentId : null}/>
         <CurrencyInput labelName={'Amount'}
                        inputType={'text'}
                        placeholder={'000,000.00'}
                        inputName={'amount'}
                        inputOnChange={investmentBalanceWithdrawal.handleChange}
                        inputOnBlur={investmentBalanceWithdrawal.handleBlur}
                        inputValue={investmentBalanceWithdrawal.values.amount}
                        inputError={investmentBalanceWithdrawal.errors.amount && investmentBalanceWithdrawal.touched.amount ?investmentBalanceWithdrawal.errors.amount : null} />
          <DigitInput labelName={'User Pin'}
                      maxLength={'4'}
                      inputType={'password'}
                      inputName={'userPin'}
                      inputOnChange={investmentBalanceWithdrawal.handleChange}
                      inputOnBlur={investmentBalanceWithdrawal.handleBlur}
                      inputValue={investmentBalanceWithdrawal.values.userPin}
                      inputError={investmentBalanceWithdrawal.errors.userPin && investmentBalanceWithdrawal.touched.userPin ?investmentBalanceWithdrawal.errors.userPin : null} />
          <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
        </form>
      </Modal>
    </div>
  );
}

export default UserDashboard;