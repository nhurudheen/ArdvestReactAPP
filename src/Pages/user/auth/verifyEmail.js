import { Link, useParams } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import { useEffect } from "react";
import { clearOTP } from "../../../Components/utils";
import OtpInputs from "../../../Components/otpInputs";
const VerifyEmail = () => {
    useEffect(() => {
        document.title = "Verify Email Address | Ardvest";
        document.querySelector('meta[name="description"]').content = "Join Ardvest: Start your investment journey with a personalized account.";
    }, []);
    let { emailAddress } = useParams();
    emailAddress = atob(emailAddress);
    const clearUserOTP = ()=>{
        clearOTP();
        document.getElementById('userInput').value ="";
    }

    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Verify your email address</p>
                <p className="text-sm text-center">Enter 6 (Six)-digit OTP code sent to {emailAddress}</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter code:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear code</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-2 mb-6" id="inputs" >
                        <OtpInputs id={'digit1'}/>
                        <OtpInputs id={'digit2'}/>
                        <OtpInputs id={'digit3'}/>
                        <OtpInputs id={'digit4'}/>
                        <OtpInputs id={'digit5'}/>
                        <OtpInputs id={'digit6'}/>
                    </div>
                    <input name="" type="text" id="userInput" hidden/>

                    <div className="flex gap-2 text-sm font-medium mb-10">
                        <input type="checkbox" name="" id="" className="bg-red-700"/>
                            <p>By signing up, you agree to our <span className="text-primary">Terms & Conditions</span></p>
                    </div>

                   
                       <Buttons btnType={'primary'} btnText={'Continue'}/>
                  

                   <p className="text-center text-sm font-medium mt-5">If you already created an account, <Link to={'/auth'}><span className="text-primary">Login</span></Link></p>


                </div>
            </div>
        </div>

                                );
}
                                export default VerifyEmail;