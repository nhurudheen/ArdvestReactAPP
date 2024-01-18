import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import Modal from "../../../Components/modals";
import emailIcon from "../../../assets/icons/email.svg";
import { Link, useLocation } from "react-router-dom";
const ResetPassword = () => {
    useEffect(() => {
        document.title = "Reset Password | Ardvest";
        document.querySelector('meta[name="description"]').content = "Reset Password to validate your account for your investment";
    }, []);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const emailAddress = location.state?.emailAddress||"";
    console.log(emailAddress);
    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'back button'} />
            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Reset your password!</p>
                <p className="text-sm text-center">Create a new password</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div action="" className="grid gap-8">
                        <InputWithLabel labelName={'New Password'}
                            inputType={'password'}
                            placeholder={'****************'} />
                        <InputWithLabel labelName={'Confirm Password'}
                            inputType={'password'}
                            placeholder={'***************'} />

                        <ul className="list-disc list-inside text-sm text-semibold font-medium">
                            <li className="list-none mb-2 ">Your password must contain:</li>
                            <li>At least 8 characters</li>
                            <li>At least 1 upper case</li>
                            <li>At least 1 number</li>
                            <li>At least 1 special character</li>
                        </ul>
                        <div className="pt-6">
                            <Buttons btnText={'Reset'} btnType={'primary'} onClick={() => setShowModal(true)} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={()=>setShowModal(false)}>
                <div className="flex justify-center">
                    <img src={emailIcon} alt="" className=" h-48 rounded-lg my-4 object-fit"/></div>
                <p className="text-xl text-primary font-medium mt-8 text-center">Success</p>
                <p className="text-sm text-[#c4c4c4] font-medium mt-2 mb-8 text-center">Your password has been reset. Please login with your new password</p>

               <Link to={'/auth'}><Buttons btnType={'primary'} btnText={'Login'}/></Link>
            </Modal>
        </div>

    );
}

export default ResetPassword;