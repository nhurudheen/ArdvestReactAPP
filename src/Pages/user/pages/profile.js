import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import InputWithLabel from "../../../Components/inputWithLabel";
import Buttons from "../../../Components/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setUserWithdrawalAccount, userDataSummary } from "../../../hooks/local/userReducer";
import Spinner from "../../../Components/spinner";
import { useUserBalanceSummary } from "../userLayout/reusableEffects";
import investmentIcon from "../../../assets/icons/investment.svg";
const UserProfile = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Profile");
        document.title = "Profile | Ardvest";
        document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    }, [setPageTitle]);
    const userBalanceSummary = useUserBalanceSummary();
    const portfolioBalance = userBalanceSummary?.totalBalance? userBalanceSummary.totalBalance : '0.00';
    const investmentBalance = userBalanceSummary?.investmentBalance? userBalanceSummary.investmentBalance : '0.00'; 
    const amountDeposit = userBalanceSummary?.amountDeposit? userBalanceSummary.amountDeposit : '0.00'; 
    const amountWithdrawal = userBalanceSummary?.amountWithdraw? userBalanceSummary.amountWithdraw : '0.00';  
    const [tabVisibility, setTabVisibility] = useState({ profileTab: true, investmentTab: false, accountTab: false });
    const userData = useSelector((state)=>state.user.userSummaryData);
    const investmentData = useSelector((state)=>state.user.userInvestmentList);
    const dispatch = useDispatch();
    const showTab = (tabId) => {
        setTabVisibility(() => ({
            profileTab: tabId === 'profileTab',
            investmentTab: tabId === 'investmentTab',
            accountTab: tabId === 'accountTab',
        }))
    }

    const updateUserProfile = useFormik({
        initialValues : {
            ...userData.userDetails
        },
        validationSchema : {

        }
    })
    const updateBankAccount = useFormik({
        initialValues: {
            ...userData.userWithdrawalAccount
        },
        validationSchema : Yup.object({
            accountName : Yup.string().required("Account Name cannot be empty"),
            accountNumber: Yup.number().required("Account Number cannot be empty").typeError('Account Number can only be in Number'),
            bankName: Yup.string().required("Bank Name cannot be empty")
        }),
        onSubmit:async(values)=>{
            const {accountName, bankName, accountNumber, userId} = values;
            let updateBankAccountData = {accountName,bankName,accountNumber,userId};
            const {payload} = await dispatch(setUserWithdrawalAccount(updateBankAccountData))
            if(payload.statusCode === "200"){
                await dispatch(userDataSummary(userId));
            }
        }

    })
    return (
        <div className="col-span-10 md:mx-4">
            <Spinner loading={useSelector((state)=>state.user).loading}/>
            <NavigationHeader title={'Profile Details'} />
            <div className="mt-10 grid md:flex gap-4 mb-4">
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.profileTab ? 'opacity-50' : ''}`} id="personalDetails" onClick={() => showTab('profileTab')}>Personal Details</span>
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investmentTab ? 'opacity-50' : ''}`} id="investmentDetails" onClick={() => showTab('investmentTab')} >Investment Details</span>
                <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.accountTab ? 'opacity-50' : ''}`} id="withdrawalDetails" onClick={() => showTab('accountTab')}>Withdrawal Account Details</span>
            </div>

            <div id="profileTab" className={tabVisibility.profileTab ? '' : 'hidden'}>
                <div className="grid grid-cols-12 items-center mt-10 mb-16 gap-4">
                    <span className="col-span-4 md:col-span-2 text-xs bg-primary/30 p-1 rounded-full mb-4 font-medium">
                        <img src={userData.userDetails.passport} alt="" className="rounded-full aspect-square" />
                    </span>
                    <div className="col-span-8 md:col-span-10 text-primary font-semibold">
                        <p className="text-xl">{userData.userDetails.firstname}  {userData.userDetails.lastname}</p>
                        <p className="text-sm">{userData.userDetails.userEmailAddress}</p>
                    </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputWithLabel labelName={'Legal first name'}
                                    inputName={'firstname'}
                                    inputValue={updateUserProfile.values.firstname}
                                     inputType={'text'} />
                    <InputWithLabel labelName={'Legal middle name'}
                                    inputType={'text'}
                                    inputName={'middleName'}
                                    inputValue={updateUserProfile.values.middleName} />
                    <InputWithLabel labelName={'Legal last name'}
                                    inputType={'text'}
                                    inputName={'lastname'}
                                    inputValue={updateUserProfile.values.lastname} />
                    <InputWithLabel labelName={'Home address'}
                                    inputType={'text'}
                                    inputName={'homeAddress'}
                                    inputValue={updateUserProfile.values.homeAddress} />
                    <InputWithLabel labelName={'Gender'}
                                    inputType={'text'}
                                    inputName={'gender'}
                                    inputValue={updateUserProfile.values.gender} />
                    <InputWithLabel labelName={'Next of kin'}
                                    inputType={'text'}
                                    inputName={'nextOfKinName'}
                                    inputValue={updateUserProfile.values.nextOfKinName} />
                    <InputWithLabel labelName={'Bank verification Number (BVN)'}
                                    inputType={'number'}
                                    inputName={'bvn'}
                                    inputValue={updateUserProfile.values.bvn} />
                    <InputWithLabel labelName={'Next of kin Phone number'}
                                    inputType={'text'}
                                    inputName={'nextOfKinPhoneNumber'}
                                    inputValue={updateUserProfile.values.nextOfKinPhoneNumber} />
                    <InputWithLabel labelName={'Next of kin address'}
                                    inputType={'text'}
                                    inputName={'nextOfKinAddress'}
                                    inputValue={updateUserProfile.values.nextOfKinAddress} />
                    <div className="items-center pt-5"> 
                     <Buttons btnText={'Update Account'} btnType={'primary'} type={'button'} />
                    </div>
                </form>
            </div>

            <div id="investmentTab" className={tabVisibility.investmentTab ? '' : 'hidden'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid border p-4 rounded-lg gap-4 bg-[#C3FFC6] order-1 md:order-0">
                    <p className="overflow-hidden text-sm ">Portfolio Balance</p>
                    <p className="text-end text-3xl font-semibold">&#8358;{portfolioBalance}</p>
                  </div>

                  <div className="grid border p-4 rounded-lg gap-4 bg-[#FFEFCA] order-0 md:order-1">
                      <p className="overflow-hidden text-sm">Active Investment Balance</p>
                      <p className="text-end text-3xl font-semibold">&#8358;{investmentBalance}</p>
                  </div>

                  <div className="grid border p-4 rounded-lg gap-4 odd:bg-[#FFEFCA] even:bg-[#C3FFC6] order-2 md:order-2">
                      <p className="overflow-hidden text-sm">Total Deposit</p>
                      <p className="text-end text-3xl font-semibold">&#8358;{amountDeposit}</p>
                  </div>

                  <div className="grid border p-4 rounded-lg gap-4  odd:bg-[#FFEFCA] even:bg-[#C3FFC6] order-3 md:order-3">
                      <p className="overflow-hidden text-sm">Total Withdrawal</p>
                      <p className="text-end text-3xl font-semibold">&#8358;{amountWithdrawal}</p>
                  </div>
              </div>
              <p className="overflow-hidden text-lg font-semibold py-4">Investment</p>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
               {investmentData.map((val,key)=>{
                    return(
                        <div className="bg-[#F5F5F5] py-4 px-4 rounded-lg grid md:flex gap-4 items-center" key={key}>
                        <img src={investmentIcon} alt=""/>
                        <div className="grid grid-cols-1 w-full items-center">
                          <div className="flex justify-between">
                            <div>
                              <p className="truncate overflow-hidden text-sm">{val.investmentName}</p>
                              <p className="truncate overflow-hidden text-xs pt-2"><span className="font-semibold pr-2">Amount:</span><span>&#8358;{val.amount}</span></p>
                            </div>
                            <div>
                              <p className="text-xs"><span className="font-semibold pr-2">Status:</span><span>{val.status}</span></p>
                              <p className="text-xs pt-2"><span className="font-semibold pr-2">ROI:</span><span>{val.roi} %</span></p>
                            </div>
                          </div>
                          <div className="flex justify-between pt-1">
                              <p className="text-xs"><span className="font-semibold pr-2">Investment End Date:</span><span>{val.investmentEndDate}</span></p>                          
                              <p className="text-xs"><span className="font-semibold pr-2">Booked Date:</span><span>{val.insertedDt}</span></p>
                          </div>
                        </div>   
                      </div>
                    )
               })}
             </div>
            </div>

            <div id="accountTab" className={tabVisibility.accountTab ? '' : 'hidden'}>
            <p className="text-red-500 font-bold pb-4">Kindly Note that withdrawal will be made to this account:</p>
              <form className="grid grid-cols-1 md:grid-cols-2  gap-5" onSubmit={updateBankAccount.handleSubmit}>
                  <div className="grid grid-cols-1 gap-8">
                    <InputWithLabel labelName={'Account Name'}
                                    inputType={'text'}
                                    inputName={'accountName'}
                                    inputValue={updateBankAccount.values.accountName}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.accountName && updateBankAccount.touched.accountName ?  updateBankAccount.errors.accountName : null}
                                    />
                    <InputWithLabel labelName={'Account Number'}
                                    inputType={'text'}
                                    inputName={'accountNumber'}
                                    inputValue={updateBankAccount.values.accountNumber}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.accountNumber && updateBankAccount.touched.accountNumber ?  updateBankAccount.errors.accountNumber : null}/>
                    <InputWithLabel labelName={'Bank'}
                                    inputType={'text'}
                                    inputName={'bankName'}
                                    inputValue={updateBankAccount.values.bankName}
                                    inputOnBlur={updateBankAccount.handleBlur}
                                    inputOnChange={updateBankAccount.handleChange}
                                    inputError={updateBankAccount.errors.bankName && updateBankAccount.touched.bankName ?  updateBankAccount.errors.bankName : null}/>  
                    <div>
                    <Buttons btnText={`${updateBankAccount.values.accountName === "" ?'Create ' :' Update '}Withdrawal Account`} btnType={'primary'} type={'submit'}/>                 
                    </div> 
                  </div>
            </form>
            </div>
        </div>
    );
}

export default UserProfile;