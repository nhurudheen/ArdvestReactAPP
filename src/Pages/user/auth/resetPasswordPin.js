import { useEffect } from "react";
import { clearOTP } from "../../../Utils/utils";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import OtpInputs from "../../../Components/otpInputs";
import { Link } from "react-router-dom";
import lockIcon from "../../../assets/icons/lock.svg";

const ResetPin = () => {
    useEffect(() => {
        document.title = "Verify Email Address | Ardvest";
        document.querySelector('meta[name="description"]').content = "Verify Email Address to validate your account for your investment";
    }, []);
    const clearUserOTP = () => {
        clearOTP();
        document.getElementById('userInput').value = "";
    }

    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <div class="grid gap-2">
                <img src={lockIcon} alt="" class="justify-self-center mb-5"/>
                    <p class="text-center text-xl font-semibold text-primary">Verify password reset token</p>
                    <p class="text-sm text-center">Please enter the 6 digit pin that was sent to your email address</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter code:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear code</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-2 mb-6" id="inputs" >
                        <OtpInputs id={'digit1'} />
                        <OtpInputs id={'digit2'} />
                        <OtpInputs id={'digit3'} />
                        <OtpInputs id={'digit4'} />
                        <OtpInputs id={'digit5'} />
                        <OtpInputs id={'digit6'} />
                    </div>
                    <input name="" type="text" id="userInput" hidden />

                    <Link to={`/resetPassword`}><Buttons btnType={'primary'} btnText={'Verify'} /></Link>


                    <p className="text-center text-sm font-medium mt-5">I didn't get a token, <Link to={''}><span className="text-primary">Try Again</span></Link></p>


                </div>
            </div>
        </div>

    );
}

export default ResetPin;