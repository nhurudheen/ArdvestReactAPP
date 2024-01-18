import { useEffect } from "react";
import { clearOTP, handleInput } from "../../../Utils/utils";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import OtpInputs from "../../../Components/otpInputs";
import { Link, useNavigate } from "react-router-dom";
import lockIcon from "../../../assets/icons/lock.svg";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { showErrorToastMessage } from "../../../Utils/constant";
import { verifyEmailAddress } from "../../../hooks/local/userReducer";
import Spinner from "../../../Components/spinner";

const ResetPin = () => {
    useEffect(() => {
        document.title = "Verify Email Address | Ardvest";
        document.querySelector('meta[name="description"]').content = "Verify Email Address to validate your account for your investment";
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>state.user);
    const clearUserOTP = () => {
        clearOTP();
        document.getElementById('userInput').value = "";
    }
    const handleOtpCodeChange = (currentInput) => {
        const userInput = handleInput(currentInput);
        verifyUserOtp.setFieldValue('otpCode', userInput);
    };

    const verifyUserOtp = useFormik(
        {
            initialValues: {
                otpCode: "",
            },
            onSubmit: async (values) => {
                if (values.otpCode === "") {
                    showErrorToastMessage("OTP Code cannot be empty");
                    return;
                }
                const { otpCode } = values;
                let otpData = { otpCode };
                const { payload } = await dispatch(verifyEmailAddress(otpData));
                if (payload.statusCode === "200") {
                    const emailAddress = payload.result.userEmailAddress;
                    navigate('/resetPassword', { state: { emailAddress } });
                }
            }
        }
    )

    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <Spinner loading={users.loading} />
            <div className="grid gap-2">
                <img src={lockIcon} alt="" className="justify-self-center mb-5"/>
                    <p className="text-center text-xl font-semibold text-primary">Verify password reset token</p>
                    <p className="text-sm text-center">Please enter the 6 digit pin that was sent to your email address</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter code:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear code</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-2 mb-6" id="inputs" >
                        {[{id:"digit1"}, {id:"digit2"}, {id:"digit3"},{id:"digit4"}, {id:"digit5"}, {id:"digit6"}].map(
                            (id)=>(
                                <OtpInputs id={id} onChange={handleOtpCodeChange}/>
                            )
                        )
                        }
                    </div>
                    <form onSubmit={verifyUserOtp.handleSubmit}>
                        <input name="otpCode" type="text" id="userInput" hidden value={verifyUserOtp.values.otpCode} onChange={verifyUserOtp.handleChange} onBlur={verifyUserOtp.handleBlur} />

                        <Buttons btnType={'primary'} btnText={'Verify'} type={'submit'} />
                    </form>
            


                    <p className="text-center text-sm font-medium mt-5">I didn't get a token, <Link to={''}><span className="text-primary">Try Again</span></Link></p>


                </div>
            </div>
        </div>

    );
}

export default ResetPin;