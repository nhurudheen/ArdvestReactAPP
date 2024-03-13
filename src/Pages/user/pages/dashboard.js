import { useEffect, useState } from "react";
import { currencyFormat, getPeriodOfDay } from "../../../Utils/utils";
import eyeIcon from "../../../assets/icons/eye.svg";
import investmentSvg from "../../../assets/images/investmentSvg.svg";
import creditSvg from "../../../assets/icons/credit.svg";
import debitSvg from "../../../assets/icons/debit.svg";
import { useSelector } from "react-redux";
import { useUserBalanceSummary, useUserTransactionHistory } from "../userLayout/reusableEffects";
import Spinner from "../../../Components/spinner";
import { Link } from "react-router-dom";

const UserDashboard = ({ setPageTitle }) => {
  const [timeOfTheDay, setTimeOfTheDay] = useState("");
  const [showROIBalance, setShowROIBalance] = useState(false);
  const [showInvestmentBalance, setShowInvestmentBalance] = useState(false);
  const userTransactionHistory = useUserTransactionHistory();
  const userBalanceSummary = useUserBalanceSummary();

  const roiBalance = userBalanceSummary?.roiBalance ? currencyFormat(userBalanceSummary.roiBalance) : '0.00';
  const investmentBalance = userBalanceSummary?.investmentBalance ? currencyFormat(userBalanceSummary.investmentBalance) : '0.00';

  useEffect(() => {
    setPageTitle("Dashboard");
    document.title = "Dashboard | Ardvest";
    document.querySelector('meta[name="description"]').content = "Track investments, gain insights, and grow wealth with Ardvest dashboard.";
    setTimeOfTheDay(getPeriodOfDay);

  }, [setPageTitle]);



  return (

    <div className="col-span-10 md:mx-4">
      <Spinner loading={useSelector((state) => state.user).loading} />
      <p>Good {timeOfTheDay}<span id="time-period"></span>, <span className="font-semibold">{useSelector((state) => state.user.userSessionData).firstname}</span></p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-5">

        <div className="grid gap-y-4">
          <div className="bg-[#EAFFEB] rounded-3xl px-5 md:px-10 py-5 md:py-7 border border-primary">
            <button className="flex items-center bg-white hover:bg-primary/10 px-4 py-2 rounded-full justify-self-end" onClick={() => { setShowROIBalance(!showROIBalance) }}>
              <img src={eyeIcon} alt="" />
              <span className="text-xs text-primary font-medium">{showROIBalance ? 'Hide Balance' : 'Show balance'}</span>
            </button>
            <p className="mt-5 font-medium text-lg">ROI Balance</p>
            <p className="text-2xl text-primary">
              <span>&#8358;</span>
              {showROIBalance ?
                (<><span className="text-6xl font-medium">{roiBalance.wholeNumber}</span>.<span>{roiBalance.decimalPart}</span></>)
                : (<span className="text-6xl font-medium">*,***,***.**</span>)
              }
            </p>
          </div>
          <div className="bg-[#FFF1CF] rounded-3xl px-5 md:px-10 py-5 md:py-7 border border-[#FEC844]">
            <button className="flex items-center bg-white hover:bg-primary/10 px-4 py-2 rounded-full justify-self-end" onClick={() => { setShowInvestmentBalance(!showInvestmentBalance) }}>
              <img src={eyeIcon} alt="" />
              <span className="text-xs text-primary font-medium">{showInvestmentBalance ? 'Hide Balance' : 'Show balance'}</span>
            </button>
            <p className="mt-5 font-medium text-lg">Investment Balance</p>
            <p className="text-2xl text-primary">
              <span>&#8358;</span>
              {showInvestmentBalance ?
                (<><span className="text-6xl font-medium">{investmentBalance.wholeNumber}</span>.<span>{investmentBalance.decimalPart}</span></>)
                : (<span className="text-6xl font-medium">*,***,***.**</span>)
              }
            </p>
          </div>
        </div>
        <div>

          <div className="bg-primary rounded-2xl relative">
            <img src={investmentSvg} alt="" className="pt-2 " />
            <div className="grid grid-cols-2 absolute bottom-0 p-8">
              <div>
                <p className="col-span-1 text-4xl md:text-[45px] leading-8 md:leading-10 font-semibold md:mr-9 mb-8 md:mb-10 text-white">Invest in what you eat</p>
                <Link to={'/investment'}><span className=" rounded-md bg-white py-4 px-8 text-sm text-primary font-semibold">Start now</span></Link>
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
            <Link to={"/transactions"}><span className="text-primary font-medium underline">View all</span></Link>
          </div>
          <div className=" px-4 py-8 rounded-lg mt-4 grid gap-4 bg-black/1">
            {
              userTransactionHistory.length > 0 ?
                userTransactionHistory.slice(0,5).map((val, key) => {
                  const transactionIcon = (val.transactionType === "Book Investment") ? creditSvg : debitSvg;
                  const statusColor = (val.status === "Approved") ? 'text-primary' :(val.status === "Pending") ?'text-yellow-500' :'text-red-500';
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


    </div>
  );
}

export default UserDashboard;