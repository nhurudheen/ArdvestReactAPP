import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { Link } from "react-router-dom";
import { getPeriodOfDay } from "../../../Components/utils";

const UserLogin = () => {
    const [timeOfTheDay, setTimeOfTheDay] = useState();
    useEffect(() => {
        document.title = "Login | Ardvest";
        document.querySelector('meta[name="description"]').content = "Secure sign-in to Ardvest: Empowering your smart investment journey.";
        setTimeOfTheDay(getPeriodOfDay());
    }, []);
  
    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />

            <div className="grid gap-2">
                <p className="text-sm text-center">Good {timeOfTheDay},</p>
                <p className="text-center text-xl font-semibold text-primary">Welcome back!</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="grid gap-8">
                        <InputWithLabel labelName={'Email Address'}
                            inputType={'email'}
                            placeholder={'e.g johndoe@xyz.com'} />
                        <InputWithLabel labelName={'Password'}
                            inputType={'password'}
                            placeholder={'*********************'} />
                        <a href="/forgot-password.html" className="text-xs font-semibold underline text-primary text-end">Forgot password?</a>
                        <Buttons btnText={'Continue'} btnType={'primary'} />
                        <p className="text-center text-sm">Don't have an account ? <Link to={'/createAccount'}><span className="text-primary">Create Account</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;