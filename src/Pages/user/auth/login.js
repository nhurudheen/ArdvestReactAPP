import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { Link, useNavigate } from "react-router-dom";
import { getPeriodOfDay } from "../../../Utils/utils";
import PasswordInput from "../../../Components/passwordInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userAuthenticate, userDataSummary, userInvestmentList } from "../../../hooks/local/userReducer";
import Spinner from "../../../Components/spinner";
import { showSuccessToastMessage } from "../../../Utils/constant";

const UserLogin = () => {
    const [timeOfTheDay, setTimeOfTheDay] = useState();
    useEffect(() => {
        document.title = "Login | Ardvest";
        document.querySelector('meta[name="description"]').content = "Secure sign-in to Ardvest: Empowering your smart investment journey.";
        setTimeOfTheDay(getPeriodOfDay());
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>state.user);
    const userAuthForm = useFormik({
        initialValues :{
            emailAddress : "",
            password : ""
        },
        validationSchema : Yup.object({
            emailAddress: Yup.string().email("Invalid Email Address").required("Email is required"),
            password: Yup.string().required("Password cannot be empty"),
        }),
        onSubmit: async (values)=>{
            const {emailAddress, password} = values;
            let authData = {emailAddress, password};
            const { payload } = await dispatch(userAuthenticate(authData))
            if(payload.statusCode  === "201"){
                navigate('/verifyEmail', {state: {emailAddress}});
            }
            if(payload.statusCode ==="202"){
                navigate('/signUpProfile', {state: {emailAddress}});
            }
            if(payload.statusCode === "203"){
                navigate('/setUpPin', {state: {emailAddress}})
            }
            if(payload.statusCode === "200"){
                showSuccessToastMessage("Working Fine")
                // navigate('/dashboard');
                // const userId = payload.result.userId;
                // await dispatch(userDataSummary(userId));
                // await dispatch(userInvestmentList(userId));
            }
        }
    })
    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <Spinner loading={users.loading}/>
            <div className="grid gap-2">
                <p className="text-sm text-center">Good {timeOfTheDay},</p>
                <p className="text-center text-xl font-semibold text-primary">Welcome back!</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <form className="grid gap-8" onSubmit={userAuthForm.handleSubmit}>
                        <InputWithLabel labelName={'Email Address'}
                            inputType={'email'}
                            inputName={'emailAddress'}
                            placeholder={'e.g johndoe@xyz.com'}
                            inputOnBlur={userAuthForm.handleBlur}
                            inputValue={userAuthForm.values.emailAddress} 
                            inputOnChange={userAuthForm.handleChange}
                            inputError={userAuthForm.touched.emailAddress && userAuthForm.errors.emailAddress ? userAuthForm.errors.emailAddress : null}/>
                        <PasswordInput labelName={'Password'}
                            inputType={'password'}
                            inputName={'password'}
                            placeholder={'*********************'}
                            inputOnBlur ={userAuthForm.handleBlur}
                            inputValue={userAuthForm.values.password}
                            inputError={userAuthForm.touched.password && userAuthForm.errors.password ? userAuthForm.errors.password : null} 
                            inputOnChange={userAuthForm.handleChange }
                            />
                        <Link to={'/forgotPassword'} className="text-end  mt-[-25px]"><span className="text-xs font-semibold text-primary text-end">Forgot password?</span></Link>
                        <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
                        <p className="text-center text-sm">Don't have an account ? <Link to={'/createAccount'}><span className="text-primary">Create Account</span></Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;