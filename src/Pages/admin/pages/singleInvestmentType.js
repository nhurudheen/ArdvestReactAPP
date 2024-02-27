import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationHeader from "../../../Components/navigationHeader";
import Modal from "../../../Components/modals";
import { useInvestmentTypeInvestors, useInvestmentTypeList } from "../adminLayout/reusableEffect";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import searchIcon from "../../../assets/icons/search.svg";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import { SearchTable, filterTable } from "../../../Utils/utils";
const SingleInvestmentType = ({ setPageTitle }) => {
  useEffect(() => {
    setPageTitle("Investments");
    document.title = "Investments | Ardvest";
    document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
  }, [setPageTitle]);
  let { investmentId, investmentName } = useParams();
  investmentId = atob(investmentId);
  investmentName = atob(investmentName);
  const [tabVisibility, setTabVisibility] = useState({ investmentTab: true, investorsTab: false });
  const showTab = (tabId) => {
    setTabVisibility(() => ({
      investmentTab: tabId === 'investmentTab',
      investorsTab: tabId === 'investorsTab',
    }))
  }
  const listInvestmentType = useInvestmentTypeList(investmentId);
  const investorList = useInvestmentTypeInvestors(investmentId);
  console.log(investorList);
  const [deleteInvestmentModal, setDeleteInvestmentModal] = useState(false);
  const [createInvestmentModal, setCreateInvestmentModal] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);

  return (
    <div className="col-span-10">
      <Spinner loading={useSelector((state) => state.admin).loading} />
      <div className="md:flex justify-between items-center">
        <NavigationHeader title={investmentName + " Investment"} />
        <div className="mt-4 md:mt-0 d-grid">
          <button className="bg-red-500 text-white rounded px-6 py-3 mb-4 md:mb-0 md:mx-4 hover:bg-red-500/50 hover:text-black" onClick={() => setDeleteInvestmentModal(true)}>Delete {investmentName} Investment</button>
          <button className="bg-primary text-white rounded px-6 py-3 hover:bg-primary/20 hover:text-primary">Add New {investmentName} Investment</button>
        </div>
      </div>

      <div className="mt-10 grid md:flex gap-4 mb-4">
        <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investmentTab ? 'opacity-50' : ''}`} id="investmentTab" onClick={() => showTab('investmentTab')}>{investmentName} Investments</span>
        <span className={`py-3 px-5 bg-primary text-xs text-white rounded-md cursor-default ${tabVisibility.investorsTab ? 'opacity-50' : ''}`} id="investorsTab" onClick={() => showTab('investorsTab')} >{investmentName} Investors</span>
      </div>

      <div id="investmentTab" className={tabVisibility.investmentTab ? '' : 'hidden'}>
        {listInvestmentType.length > 0
          ? (
            <div>
              {
                listInvestmentType.map((val, key) => {
                  return (
                    <div className="grid md:flex justify-between items-center bg-[#f8f8f8] px-4 py-6 rounded mb-6 gap-8" key={key}>
                      <div className="flex items-center gap-3">
                        <img src={val.investmentImage} alt="" className="rounded-[50px] h-20 w-20" />
                        <div className="grid">
                          <span className="text-lg font-semibold text-primary">{val.investmentName}</span>
                          <span className={`text-sm ${val.status === 'Active' ? 'text-primary/50' : 'text-red-500'} font-medium`}>{val.status} </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:flex gap-4">
                        <div>
                          <button className="text-sm px-6 py-3 rounded-md bg-primary text-white w-full" onClick={() => setSelectedInvestmentType(val)}>View More</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {
                selectedInvestmentType && (
                  <Modal isVisible={selectedInvestmentType !== null} onClose={() => setSelectedInvestmentType(null)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="rounded-lg overflow-hidden">
                        <img src={selectedInvestmentType.investmentImage} alt="" className="h" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-primary">{selectedInvestmentType.investmentName}</p>
                        <p className="text-sm text-[#c4c4c4] text-justify">{selectedInvestmentType.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:flex justify-between text-[#c4c4c4] mt-6 gap-y-3">
                      <div>
                        <p className="text-xs text-black">Current investors</p>
                        <p className="font-semibold text-black">{selectedInvestmentType.noOfPeople}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black">Minimum Investment</p>
                        <p className="font-semibold text-black">&#8358;{selectedInvestmentType.minimumInvestment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black">Maximum Investment</p>
                        <p className="font-semibold text-black">&#8358;{selectedInvestmentType.maximumInvestment}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1 md:flex justify-between text-[#c4c4c4] mt-6 gap-y-3">
                      <div>
                        <p className="text-xs text-black">ROI</p>
                        <p className="font-semibold text-black">{selectedInvestmentType.roi} %</p>
                      </div>
                      <div>
                        <p className="text-xs text-black">Start Date</p>
                        <p className="font-semibold text-black">&#8358;{selectedInvestmentType.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black">End Date</p>
                        <p className="font-semibold text-black">&#8358;{selectedInvestmentType.endDate}</p>
                      </div>
                    </div>

                    <p className="text-sm mt-4 m-8">Investment Status: <span className={`font-semibold ${selectedInvestmentType.status === 'Active' ? 'text-primary/50' : 'text-red-500'}`}>{selectedInvestmentType.status}</span></p>

                  </Modal>
                )
              }
            </div>

          )

          : (
            <div className="grid gap-4 my-16 ">
              <div className="w-full grid justify-center">
                <img src={comingSoon} alt="" />
              </div>
              <p className="text-center text-lg font-semibold text-primary">No Investment Available under {investmentName} Investment</p>
              <p className="text-center">Click the Add Investment Button to create investment. </p>
            </div>
          )
        }
      </div>

      <div id="investorsTab" className={tabVisibility.investorsTab ? '' : 'hidden'}>
        {investorList.length > 0
          ? (
            <div className="bg-white px-4 md:px-8 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center">
            <div className="flex items-center gap-3 mb-2 col-span-2">
                  <span className="text-lg text-primary font-semibold">All Investors</span>
              </div>
              <div className="flex items-center justify-center bg-[#f8f8f8] border rounded w-full col-span-1">
                <div className="px-3">
                  <img src={searchIcon} alt=""/>
                </div>
                <input type="search" id="searchInput" onInput={SearchTable} className="w-full px-3 py-4 bg-[#f8f8f8] text-sm active:outline-none focus:outline-none placeholder:text-xs" placeholder="Search Investors..."/>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <label for="statusFilter" className="block text-sm font-medium">Showing :</label>
                <select id="statusFilter" onChange={filterTable} className="text-sm focus:outline-none focus:border-none ">
                    <option value="All">All Investors</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
              </div>
              
            <div className="overflow-x-scroll mt-10"> 
              <table className="min-w-full rounded-md overflow-hidden" id="dataTable">
                <thead className="bg-[#EBFFEB]">
                  <tr>
                    <th>S/N</th>
                    <th className="px-6 py-4 text-start"><p className="truncate w-[250px]">Investor Name</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[200px]">Investment</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Amount invested</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Date invested</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Status</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[50px]">ROI</p></th>
                    <th className="px-3 py-4 text-start"><p className="truncate w-[150px]">Investment End Date</p></th>
                  </tr>
                </thead>

                <tbody>
                  {investorList.map((val,key)=>{
                    return (
                      <tr className="odd:bg-[#F9F9F9] border-t-8 border-t-white" key={key}>
                      <td className="px-4">{key+1}</td>
                      <td className="px-6 py-4"><p className="truncate w-[250px]">{val.userData.firstName}  {val.userData.lastname}</p></td>
                      <td className="px-3 py-4"><p className="truncate w-[200px]">{val.investmentName}</p></td>
                      <td className="px-3 py-4"><p className="truncate w-[150px]">&#8358;{val.amount}</p></td>
                      <td className="px-3 py-4"><p className="truncate w-[150px]">{val.dateBooked}</p></td>
                      <td className="px-3 py-4"><p className={`truncate w-[150px] ${val.status === 'Active' ? 'text-primary/50' : 'text-red-500'} font-medium`}>{val.status}</p></td>
                      <td className="px-3 py-4">{val.roi} %</td>
                      <td className="px-3 py-4"><p className="truncate w-[150px]">{val.investmentEndDate}</p></td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
      

          </div>

          )
          :
          (
            <div className="grid gap-4 my-16 ">
              <div className="w-full grid justify-center">
                <img src={comingSoon} alt="" />
              </div>
              <p className="text-center text-lg font-semibold text-primary">No User has booked for {investmentName} Investment</p>
            </div>
          )
        }
      </div>

      <Modal isVisible={deleteInvestmentModal} onClose={() => setDeleteInvestmentModal(false)}>

        <p className="text-xl text-red-500 font-medium">Are you sure you want to Delete {investmentName} Investment</p>
        <div className="grid gap-6 mt-4">
          <div className="flex justify-between m-6">
            <button className="px-6 py-2 rounded-md bg-red-500 text-white hover:scale-105"   >Yes</button>
            <button className="px-6 py-2 rounded-md bg-primary text-white hover:scale-105" onClick={() => setDeleteInvestmentModal(false)}>No</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SingleInvestmentType;