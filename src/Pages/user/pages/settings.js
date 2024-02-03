import { useEffect, useState } from "react";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import passwordImage from "../../../assets/images/passwordReset.png";
import transactionPinImage from "../../../assets/images/pinReset.png";
import Modal from "../../../Components/modals";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import DigitInput from "../../../Components/digitInput";

const UserProfileSettings = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Settings");
        document.title = "Settings | Ardvest";
        document.querySelector('meta[name="description"]').content = "Ardvest User Account Settings.";
    }, [setPageTitle]);

    const [passwordModal, setPasswordModal] = useState(false);
    const [transactionPinModal, setTransactionPinModal] = useState(false);
    return (
        <div className="col-span-10 md:mx-4">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <NavigationHeader title={'User Settings'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#C3FFC6] hover:scale-105" onClick={()=>setPasswordModal(true)}>
                    <img src={passwordImage} className=" h-16 " alt="" />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Password.</p>
                </div>

                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#FFEFCA] hover:scale-105" onClick={()=>setTransactionPinModal(true)}>
                    <img src={transactionPinImage} alt="" className=" h-16 " />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Transaction Pin.</p>
                </div>
            </div>

            <Modal isVisible={passwordModal} onClose={()=>setPasswordModal(false)}>
            <p className="text-xl text-primary font-medium">Complete the form to Change  Access Password</p>
            <form onSubmit={''}>
            <div className="grid gap-6 mt-4">
                <InputWithLabel labelName={'Old Password'}
                                inputType={'password'}/>
                <InputWithLabel labelName={'New Password'}
                                inputType={'password'}/>
                <InputWithLabel labelName={'Confirm Password'}
                                inputType={'password'}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
            <Modal isVisible={transactionPinModal} onClose={()=>setTransactionPinModal(false)}>
            <p className="text-xl text-primary font-medium">Complete the form to Change Transaction Pin</p>
            <form onSubmit={''}>
            <div className="grid gap-6 mt-4">
                <InputWithLabel labelName={'Password'}
                                inputType={'password'}/>
                <DigitInput labelName={'New Transaction Pin (4 Digit Pin):'}
                            maxLength={'4'}
                            inputType={'password'}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
        </div>
    );
}

export default UserProfileSettings;