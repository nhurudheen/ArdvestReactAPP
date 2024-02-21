import { useDispatch, useSelector } from "react-redux";
import AuthHeaders from "../../../Components/authHeader";
import Spinner from "../../../Components/spinner";
import { useEffect, useState } from "react";
import { getPeriodOfDay } from "../../../Utils/utils";
import InputWithLabel from "../../../Components/inputWithLabel";
import PasswordInput from "../../../Components/passwordInput";
import Buttons from "../../../Components/buttons";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { auth } from "../../../hooks/local/adminReducer";

const AdminAuth = () => {
    const [timeOfTheDay, setTimeOfTheDay] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login | Ardvest";
        document.querySelector('meta[name="description"]').content = "Empowering smart investing and personalized wealth growth through secure login";
        setTimeOfTheDay(getPeriodOfDay());
    }, []);
    const adminSignUp = useFormik({
        initialValues : {
            emailAddress : "",
            password : "",
        },
        validationSchema: Yup.object({
            emailAddress: Yup.string().email("Invalid Email Address").required("Email Address is required"),
            password: Yup.string().required("Password cannot be empty"),
        }),
        onSubmit:async(values)=>{
            const {emailAddress, password} = values;
            let adminAuthData = {emailAddress, password};
            const {payload} = await dispatch(auth(adminAuthData));
            if(payload.statusCode === "200"){
                navigate("/management")
            }
        }
    })
    return (  
        <div>
            <AuthHeaders/>
            <Spinner loading={useSelector((state)=>state.admin).loading}/>
            <div className="grid gap-2 mt-12">
                <p className="text-sm text-center">Good {timeOfTheDay},</p>
                <p className="text-center text-xl font-semibold text-primary">Welcome back! Admin</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <form className="grid gap-8" onSubmit={adminSignUp.handleSubmit}>
                        <InputWithLabel labelName={'Email Address'}
                                        placeholder ={'e.g johndoe@example.com'}
                                        inputType={'email'}
                                        inputName={'emailAddress'}
                                        inputOnBlur={adminSignUp.handleBlur}
                                        inputValue={adminSignUp.values.emailAddress}
                                        inputOnChange={adminSignUp.handleChange}
                                        inputError={adminSignUp.errors.emailAddress && adminSignUp.touched.emailAddress ? adminSignUp.errors.emailAddress : null}
                                        />
                        <PasswordInput labelName={'Password'} 
                                       placeholder={'***************'} 
                                       inputName={'password'}
                                       inputOnBlur={adminSignUp.handleBlur}
                                       inputValue={adminSignUp.values.password}
                                       inputOnChange={adminSignUp.handleChange}
                                       inputError={adminSignUp.errors.password && adminSignUp.touched.password ? adminSignUp.errors.password : null}/>    
                        <Buttons btnText={'Continue'}  btnType={'primary'}  type={'submit'}/>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AdminAuth;