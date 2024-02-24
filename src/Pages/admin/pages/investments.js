import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import Buttons from "../../../Components/buttons";
import comingSoon from "../../../assets/icons/comingSoon.svg";
import investmentIcon from "../../../assets/images/money.png"
import arrowIcon from "../../../assets/icons/arrow2.svg";
import Modal from "../../../Components/modals";
import InputWithLabel from "../../../Components/inputWithLabel";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { createNewInvestmentType } from "../../../hooks/local/adminReducer";

const Investment = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Investments");
        document.title = "Investments | Ardvest";
        document.querySelector('meta[name="description"]').content = "Explore investment opportunities, manage your investments, and monitor your portfolio seamlessly with Ardvest.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const investmentTypeList = useSelector((state) => state.admin.investmentTypes);
    const [investmentTypeModal, setInvestmentTypeModal] = useState(false);
    const addNewInvestmentType = useFormik({
        initialValues : {
            investmentName : ""
        },
        validationSchema: Yup.object({
            investmentName: Yup.string().required("Investment Name cannot be empty")
        }),
        onSubmit: async(values)=>{
            const {investmentName} = values;
            let investmentTypeData = {investmentName};
            const {payload} = await dispatch(createNewInvestmentType(investmentTypeData));
            if(payload.statusCode === "200"){
                
            }
        }

    })
    return (
        <div className="col-span-10">
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <div className="md:flex md:justify-between">
                <NavigationHeader title={'Available Investments'} />
                <div className="mt-4 md:mt-0">
                    <Buttons btnText={'Create New Investment'} btnType={'primary'} onClick={()=>{setInvestmentTypeModal(true)}} />
                </div>
            </div>
            {
                investmentTypeList.length > 0
                    ? (
                        <div className="grid gap-4 mt-12 md:grid-cols-2">
                            {investmentTypeList.map((val, key) => {
                                return (
                                        <div className="hover:bg-primary/20 bg-[#F5F5F5] py-4 px-4 md:px-8 rounded-lg flex gap-4 items-center" key={key}>
                                            <img src={investmentIcon} alt="" className="aspect-ratio w-8 h-8"/>
                                            <div className="flex justify-between w-full items-center">
                                                <p className="truncate overflow-hidden font-semibold text-md">{val.investmentName}</p>
                                                <img src={arrowIcon} alt="" className="h-3"/>
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

            <Modal isVisible={investmentTypeModal} onClose={()=>{setInvestmentTypeModal(false)}}>
            <p className="text-xl text-primary font-medium">Complete the form to create a new Investment Type</p>
            <form className="grid gap-6 mt-4" onSubmit={addNewInvestmentType.handleSubmit}>
                <InputWithLabel labelName={'Investment Name'}
                                inputType={'text'}
                                inputName={'investmentName'}
                                inputValue={addNewInvestmentType.values.investmentName}
                                inputOnBlur={addNewInvestmentType.handleBlur}
                                inputOnChange={addNewInvestmentType.handleChange}
                                inputError={addNewInvestmentType.errors.investmentName && addNewInvestmentType.touched.investmentName ? addNewInvestmentType.errors.investmentName : null}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </form>
            </Modal>
        </div>
    );
}

export default Investment;