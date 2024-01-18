import { Link } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { useEffect, useState } from "react";
import Modal from "../../../Components/modals";
import emailIcon from "../../../assets/icons/email.svg";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Spinner from "../../../Components/spinner";
import { userForgotPassword } from "../../../hooks/local/userReducer";

const ForgotPassword = () => {
    useEffect(() => {
        document.title = "Reset Password | Ardvest";
        document.querySelector('meta[name="description"]').content = "Regain Access to Ardvest Account securely";
    }, []);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.user);

    const verifyUserEmail = useFormik({
        initialValues : {
            emailAddress : ""
        },
        validationSchema: Yup.object({
            emailAddress : Yup.string().required("Kindly enter a valid email address").email("Enter a valid email address")
        }),
        onSubmit:async(values)=>{
            const { emailAddress } = values;
            const resetPasswordData = {emailAddress};
            const { payload } = await dispatch(userForgotPassword(resetPasswordData));
            if(payload.statusCode === "200"){
                    setShowModal(true);
            }   
        }   
    })
    return (<div>

        <AuthHeaders />
        <Buttons btnType={'back button'} />
        <Spinner loading={users.loading} />
        <div className="grid gap-2">
            <p className="text-center text-xl font-semibold text-primary">Reset your password</p>
            <p className="text-sm text-center">Enter your email address and we’ll send you a reset link</p>
        </div>
        <div className="flex justify-center w-full my-5">
            <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                <form onSubmit={verifyUserEmail.handleSubmit}>
                <InputWithLabel labelName={'Email Address'}
                                inputType={'email'}
                                inputName={'emailAddress'}
                                inputOnChange={verifyUserEmail.handleChange}
                                inputOnBlur={verifyUserEmail.handleBlur}
                                inputValue={verifyUserEmail.values.emailAddress}
                                placeholder={'e.g JohnDoe@gmail.com'}
                                inputError={verifyUserEmail.touched.emailAddress && verifyUserEmail.errors.emailAddress  ? verifyUserEmail.errors.emailAddress : null} />

                <div className="mt-8">
                    <Buttons btnText={'Request Link'}
                            type={'submit'}
                            btnType={'primary'} />
                </div>
                </form>
                <p className="text-sm text-center mt-6">Was this request a mistake?  <Link to={'/auth'}><span className="text-primary">Back to Login</span></Link></p>
            </div>

            <Modal onClose={() => setShowModal(false)}
                isVisible={showModal}>
                <div className="flex justify-center"><img src={emailIcon} alt="" className=" h-48 rounded-lg my-4 object-fit" /></div>
                <p className="text-xl text-primary font-medium mt-8 text-center">Check your email</p>
                <p className="text-sm text-[#c4c4c4] font-medium mt-2 mb-8 text-center">A password reset link has been sent to the email
                    you entered</p>

              
                <Link to={'/verifyPasswordReset'}><Buttons btnType={'primary'} btnText={'Continue'}/></Link>
            </Modal>



        </div>
    </div>);
}

export default ForgotPassword;