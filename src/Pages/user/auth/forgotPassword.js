import { Link } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { useEffect, useState } from "react";
import Modal from "../../../Components/modals";
import emailIcon from "../../../assets/icons/email.svg";

const ForgotPassword = () => {
    useEffect(() => {
        document.title = "Reset Password | Ardvest";
        document.querySelector('meta[name="description"]').content = "Regain Access to Ardvest Account securely";
    }, []);
    const [showModal, setShowModal] = useState(false);
    return (<div>

        <AuthHeaders />
        <Buttons btnType={'back button'} />
        <div class="grid gap-2">
            <p class="text-center text-xl font-semibold text-primary">Reset your password</p>
            <p class="text-sm text-center">Enter your email address and we’ll send you a reset link</p>
        </div>
        <div class="flex justify-center w-full my-5">
            <div class="p-5 w-full md:w-[75%] lg:w-[40%]">
                <InputWithLabel labelName={'Email Address'}
                    inputType={'email'}
                    placeholder={'e.g JohnDoe@gmail.com'} />

                <div className="mt-8">
                    <Buttons btnText={'Request Link'}
                        onClick={() => setShowModal(true)}
                        btnType={'primary'} />
                </div>

                <p class="text-sm text-center mt-6">Was this request a mistake?  <Link to={'/auth'}><span className="text-primary">Back to Login</span></Link></p>
            </div>

            <Modal onClose={() => setShowModal(false)}
                isVisible={showModal}>
                <div class="flex justify-center"><img src={emailIcon} alt="" class=" h-48 rounded-lg my-4 object-fit" /></div>
                <p class="text-xl text-primary font-medium mt-8 text-center">Check your email</p>
                <p class="text-sm text-[#c4c4c4] font-medium mt-2 mb-8 text-center">A password reset link has been sent to the email
                    you entered</p>

              
                <Link to={'/verifyPasswordReset'}><Buttons btnType={'primary'} btnText={'Continue'}/></Link>
            </Modal>



        </div>
    </div>);
}

export default ForgotPassword;