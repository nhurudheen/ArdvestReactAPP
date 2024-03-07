import { useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useEffect, useState } from "react";
import { useCustomerDataSummary, useCustomerInvestmentList } from "../adminLayout/reusableEffect";
import investmentIcon from "../../../assets/icons/investment.svg";
import { useParams } from "react-router-dom";
import ReadOnlyInputWithLabel from "../../../Components/readOnlyInput";
import comingSoon from "../../../assets/icons/comingSoon.svg";

const SingleCustomer = ({ setPageTitle }) => {
  useEffect(() => {
    setPageTitle("Customers");
    document.title = "Customers | Ardvest";
    document.querySelector('meta[name="description"]').content = "Explore Ardvest Customers List – Your gateway to intelligent administration and personalized wealth expansion.";
  }, [setPageTitle]);
  let { userId } = useParams();
  userId = atob(userId);
  const [tabVisibility, setTabVisibility] = useState({ profileTab: true, investmentTab: false, accountTab: false });
  const userData = useCustomerDataSummary(userId);
  console.log(userData);
  const investmentData = useCustomerInvestmentList(userId);
  const showTab = (tabId) => {
    setTabVisibility(() => ({
      profileTab: tabId === 'profileTab',
      investmentTab: tabId === 'investmentTab',
      accountTab: tabId === 'accountTab',
    }))
  }
  return (

    <div className="col-span-10">
      <NavigationHeader title={'Profile Details'} />
      <Spinner loading={useSelector((state) => state.admin).loading} />
      <div className="mt-10 grid md:flex gap-4 mb-4">
        <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.profileTab ? 'opacity-50' : ''}`} id="personalDetails" onClick={() => showTab('profileTab')}>Personal Details</span>
        <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investmentTab ? 'opacity-50' : ''}`} id="investmentDetails" onClick={() => showTab('investmentTab')} >Investment Details</span>
        <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.accountTab ? 'opacity-50' : ''}`} id="withdrawalDetails" onClick={() => showTab('accountTab')}>Withdrawal Account Details</span>
      </div>

      <div id="profileTab" className={tabVisibility.profileTab ? '' : 'hidden'}>
        <div className="grid grid-cols-12 items-center mt-10 mb-16 gap-4">
          <span className="col-span-4 md:col-span-2 text-xs bg-primary/30 p-1 rounded-full mb-4 font-medium">
            <img src={userData.userDetails?.passport ? userData.userDetails.passport : ''} alt="" className="rounded-full aspect-square" />
          </span>
          <div className="col-span-8 md:col-span-10 text-primary font-semibold">
            <p className="text-xl">{userData.userDetails?.firstname ? userData.userDetails.firstname : ''}  {userData.userDetails?.lastname ? userData.userDetails.lastname : ''}</p>
            <p className="text-sm">{userData.userDetails?.userEmailAddress ? userData.userDetails.userEmailAddress : ''}</p>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ReadOnlyInputWithLabel labelName={'Legal first name'}
            inputName={'firstname'}
            inputValue={userData.userDetails?.firstname ? userData.userDetails.firstname : ''}
            inputType={'text'} />
          <ReadOnlyInputWithLabel labelName={'Legal middle name'}
            inputType={'text'}
            inputName={'middleName'}
            inputValue={userData.userDetails?.middleName ? userData.userDetails.middleName : ''} />
          <ReadOnlyInputWithLabel labelName={'Legal last name'}
            inputType={'text'}
            inputName={'lastname'}
            inputValue={userData.userDetails?.lastname ? userData.userDetails.lastname : ''} />
          <ReadOnlyInputWithLabel labelName={'Home address'}
            inputType={'text'}
            inputName={'homeAddress'}
            inputValue={userData.userDetails?.homeAddress ? userData.userDetails.homeAddress : ''} />
          <ReadOnlyInputWithLabel labelName={'Gender'}
            inputType={'text'}
            inputName={'gender'}
            inputValue={userData.userDetails?.gender ? userData.userDetails.gender : ''} />
          <ReadOnlyInputWithLabel labelName={'Next of kin'}
            inputType={'text'}
            inputName={'nextOfKinName'}
            inputValue={userData.userDetails?.nextOfKinName ? userData.userDetails.nextOfKinName : ''} />
          <ReadOnlyInputWithLabel labelName={'Bank verification Number (BVN)'}
            inputType={'number'}
            inputName={'bvn'}
            inputValue={userData.userDetails?.bvn ? userData.userDetails.bvn : ''} />
          <ReadOnlyInputWithLabel labelName={'Next of kin Phone number'}
            inputType={'text'}
            inputName={'nextOfKinPhoneNumber'}
            inputValue={userData.userDetails?.nextOfKinPhoneNumber ? userData.userDetails.nextOfKinPhoneNumber : ''} />
          <ReadOnlyInputWithLabel labelName={'Next of kin address'}
            inputType={'text'}
            inputName={'nextOfKinAddress'}
            inputValue={userData.userDetails?.nextOfKinAddress ? userData.userDetails.nextOfKinAddress : ''} />

        </form>
      </div>

      <div id="investmentTab" className={tabVisibility.investmentTab ? '' : 'hidden'}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="grid border p-4 rounded-lg gap-4 bg-[#C3FFC6] order-1 md:order-0">
            <p className="overflow-hidden text-sm ">ROI Balance</p>
            <p className="text-end text-3xl font-semibold">&#8358;{userData.userBalanceSummary?.roiBalance ? userData.userBalanceSummary.roiBalance : ''}</p>
          </div>

          <div className="grid border p-4 rounded-lg gap-4 bg-[#FFEFCA] order-0 md:order-1">
            <p className="overflow-hidden text-sm">Active Investment Balance</p>
            <p className="text-end text-3xl font-semibold">&#8358;{userData.userBalanceSummary?.investmentBalance ? userData.userBalanceSummary.investmentBalance : ''}</p>
          </div>


          <div className="grid border p-4 rounded-lg gap-4  odd:bg-[#C3FFC6] even:bg-[#FFEFCA] order-3 md:order-3">
            <p className="overflow-hidden text-sm">Total Withdrawal</p>
            <p className="text-end text-3xl font-semibold">&#8358;{userData.userBalanceSummary?.amountWithdraw ? userData.userBalanceSummary.amountWithdraw : ''}</p>
          </div>
        </div>
        <p className="overflow-hidden text-lg font-semibold py-4">Investment</p>
        {(investmentData.length > 0)
          ?
          (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {investmentData.map((val, key) => {
                return (
                  <div className="bg-[#F5F5F5] py-4 px-4 rounded-lg grid md:flex gap-4 items-center" key={key}>
                    <img src={investmentIcon} alt="" />
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
          )
          : (
            <div className="grid gap-4 my-16">
              <div className="w-full grid justify-center">
                <img src={comingSoon} alt="" />
              </div>
              <p className="text-center text-lg font-semibold text-primary">User is yet to make an Investment</p>
            </div>
          )

        }
      </div>

      <div id="accountTab" className={tabVisibility.accountTab ? '' : 'hidden'}>
        <p className="text-red-500 font-bold pb-4">Kindly Note that withdrawal will be made to this account:</p>
        <form className="grid grid-cols-1 md:grid-cols-2  gap-5" >
          <div className="grid grid-cols-1 gap-8">
            <ReadOnlyInputWithLabel labelName={'Account Name'}
              inputType={'text'}
              inputName={'accountName'}
              inputValue={userData.userWithdrawalAccount?.accountName ? userData.userWithdrawalAccount.accountName : ''}
            />
            <ReadOnlyInputWithLabel labelName={'Account Number'}
              inputType={'number'}
              inputName={'accountNumber'}
              inputValue={userData.userWithdrawalAccount?.accountNumber ? userData.userWithdrawalAccount.accountNumber : ''} />
            <ReadOnlyInputWithLabel labelName={'Bank'}
              inputType={'text'}
              inputName={'bankName'}
              inputValue={userData.userWithdrawalAccount?.bankName ? userData.userWithdrawalAccount.bankName : ''} />
            <div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SingleCustomer;