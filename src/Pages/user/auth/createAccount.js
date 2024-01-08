import { useEffect } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { Link } from "react-router-dom";

const CreateAccount = () => {
    const userEmail = btoa('ifaniyioluwapelumi@gmail.com');
    useEffect(() => {
        document.title = "Create Account | Ardvest";
        document.querySelector('meta[name="description"]').content = "Join Ardvest: Start your investment journey with a personalized account.";
    }, []);
    return (
        <div className="relative">
            <AuthHeaders />
            <Buttons btnType={'backButton'} />

            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Get started right away!</p>
                <p className="text-sm text-center">Input your details</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="grid gap-8">
                        <InputWithLabel labelName={'Email Address'}
                            inputType={'email'}
                            placeholder={'e.g johndoe@xyz.com'} />
                        <InputWithLabel labelName={'Phone number'}
                            inputType={'number'}
                            placeholder={'e.g 08123456789'} />
                        <InputWithLabel labelName={'Password'}
                            inputType={'password'}
                            placeholder={'*********************'} />
                        <InputWithLabel labelName={'Confirm Password'}
                            inputType={'password'}
                            placeholder={'*********************'} />

                        <ul className="list-disc list-inside text-sm text-semibold font-medium">
                            <li className="list-none mb-2 ">Your password must contain:</li>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div>
                                    <li>At least 1 digit</li>
                                    <li>At least 1 upper case</li>
                                    <li>At least 1 lower case</li>
                                </div>
                                <div>
                                    <li>At least 6 characters</li>
                                    <li>At least 1 special character</li>
                                    <li>Matching Password</li>
                                </div>
                            </div>
                        </ul>

                        <Link to={`/verifyEmail/${userEmail}`}><Buttons btnText={'Continue'} btnType={'primary'} /></Link>
                        <p className="text-center text-sm">If you already created an account, <Link to={'/auth'}><span className="text-primary">Login</span></Link></p>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateAccount;