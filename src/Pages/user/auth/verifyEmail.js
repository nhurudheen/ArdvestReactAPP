import { Link, useLocation } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import { useEffect } from "react";
import { clearOTP, handleInput } from "../../../Utils/utils";
import OtpInputs from "../../../Components/otpInputs";
import { focusNext } from "../../../Utils/utils";
import { useFormik } from "formik";
import * as Yup from 'yup';

const VerifyEmail = () => {
    useEffect(() => {
        document.title = "Verify Email Address | Ardvest";
        document.querySelector('meta[name="description"]').content = "Verify Email Address to validate your account for your investment";
    }, []);
    const clearUserOTP = ()=>{
        clearOTP();
        document.getElementById('userInput').value ="";
    }

    const location = useLocation();
    const userEmailAddress = location.state?.emailAddress || '';

    const handleOtpCodeChange = (currentInput) => {
        const userInput = handleInput(currentInput);
        verifyUserOtp.setFieldValue('otpCode', userInput);
      };
      
    const verifyUserOtp = useFormik(
        {
            initialValues:{
                emailAddress :  userEmailAddress,
                otpCode : "",
                agreement: false
            },
            validationSchema: Yup.object({
                agreement: Yup.boolean().oneOf([true], 'You must agree to the Terms & Conditions'),
            }),
            onSubmit: (values)=>{
                console.log(values.otpCode);
            }
        }
    )

    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Verify your email address</p>
                <p className="text-sm text-center">Enter 6 (Six)-digit OTP code sent to {userEmailAddress}</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter code:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear code</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 mt-2 mb-6" id="inputs" >
                        <OtpInputs id={'digit1'} onChange={handleOtpCodeChange}/>
                        <OtpInputs id={'digit2'} onChange={handleOtpCodeChange}/>
                        <OtpInputs id={'digit3'} onChange={handleOtpCodeChange}/>
                        <OtpInputs id={'digit4'} onChange={handleOtpCodeChange}/>
                        <OtpInputs id={'digit5'} onChange={handleOtpCodeChange}/>
                        <OtpInputs id={'digit6'} onChange={handleOtpCodeChange}/>
                    </div>
                    <form onSubmit={verifyUserOtp.handleSubmit}>
                    <input name="otpCode" type="text" id="userInput"  value={verifyUserOtp.values.otpCode} onChange={verifyUserOtp.handleChange} onBlur={verifyUserOtp.handleBlur} />
                    <div className="mb-10">
                      <div className="flex gap-2 text-sm font-medium">
                      <input type="checkbox" name="agreement" id="" className="bg-red-700" value={verifyUserOtp.values.agreement} onChange={verifyUserOtp.handleChange} onBlur={verifyUserOtp.handleBlur}/>
                            <p>By signing up, you agree to our <span className="text-primary">Terms & Conditions</span></p>
                      </div>
                      <code className="text-red-500 text-xs">{verifyUserOtp.touched.agreement && verifyUserOtp.errors.agreement ? verifyUserOtp.errors.agreement : null}</code>
                    </div>
                    
                       <Buttons btnType={'primary'} btnText={'Continue'} type={'submit'}/>
                       </form>

                   <p className="text-center text-sm font-medium mt-5">If you already created an account, <Link to={'/auth'}><span className="text-primary">Login</span></Link></p>


                </div>
            </div>
        </div>

                                );
}
                                export default VerifyEmail;