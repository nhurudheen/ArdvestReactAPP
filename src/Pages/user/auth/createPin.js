
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import { useEffect } from "react";
import { clearOTP } from "../../../Utils/utils";
import OtpInputs from "../../../Components/otpInputs";
import pinIcon from "../../../assets/icons/lock.svg";
import { Link } from "react-router-dom";
const CreatePin = () => {
    useEffect(() => {
        document.title = "Set Pin | Ardvest";
        document.querySelector('meta[name="description"]').content = "Start your investment journey with a personalized account";
    }, []);
 
    const clearUserOTP = () => {
        clearOTP();
        document.getElementById('userInput').value = "";
    }

    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <div className="grid gap-2">
                <img src={pinIcon} alt="" className="justify-self-center mb-5"/>
                    <p className="text-center text-xl font-semibold text-primary">Create a new PIN</p>
                    <p className="text-sm text-center">This PIN should be a secure 4 (four)-digit PIN to confirm transactions when using the app</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter Pin:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear Pin</p>
                    </div>
                    <div className="grid grid-cols-4 gap-10  mt-2 mb-12" id="inputs" >
                        <OtpInputs id={'digit1'} />
                        <OtpInputs id={'digit2'} />
                        <OtpInputs id={'digit3'} />
                        <OtpInputs id={'digit4'} />
                    </div>
                    <input name="" type="text" id="userInput" hidden  />

                    <Link to={'/profileComplete'}><Buttons btnType={'primary'} btnText={'Create PIN'} /></Link>


                </div>
            </div>
        </div>

    );
}
export default CreatePin;