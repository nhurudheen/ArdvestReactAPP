import { useEffect, useState } from "react";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import passwordImage from "../../../assets/images/passwordReset.png";
import transactionPinImage from "../../../assets/images/pinReset.png";
import Modal from "../../../Components/modals";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import DigitInput from "../../../Components/digitInput";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { changeUserPassword, changeUserTransactionPin } from "../../../hooks/local/userReducer";
import PasswordInput from "../../../Components/passwordInput";

const UserProfileSettings = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Settings");
        document.title = "Settings | Ardvest";
        document.querySelector('meta[name="description"]').content = "Ardvest User Account Settings.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const emailAddress = useSelector((state)=>state.user.userSessionData).userEmailAddress;
    const [passwordModal, setPasswordModal] = useState(false);
    const [transactionPinModal, setTransactionPinModal] = useState(false);
    const changeUserPasswordForm = useFormik({
        initialValues:{
            oldPassword : "",
            newPassword : "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            oldPassword : Yup.string().required("Kindly type your old password"),
            newPassword: Yup.string().required("New Password cannot be empty"),
            confirmPassword : Yup.string().required('Confirm Password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        }),
        onSubmit: async(values, {resetForm})=>{
            const {oldPassword,newPassword,confirmPassword} = values;
            let passwordData =  {emailAddress, oldPassword,newPassword,confirmPassword};
            const { payload } = await dispatch(changeUserPassword(passwordData))
            if(payload.statusCode === "200"){
                setPasswordModal(false);
                resetForm();
            }
        }
    })

    const changeUserTransactionPinForm = useFormik({
        initialValues:{
            password : "",
            transactionPin : ""
        },
        validationSchema: Yup.object({
            password : Yup.string().required("Kindly type your password"),
            transactionPin: Yup.string().required("Transaction Pin cannot be empty").typeError('Transaction Pin can only be in Number').matches(/^\d{4}$/, 'Transaction Pin must be exactly 4 digits'),
        }),
        onSubmit: async(values, {resetForm})=>{
            const {password,transactionPin} = values;
            let passwordData =  {emailAddress, password,transactionPin};
            const { payload } = await dispatch(changeUserTransactionPin(passwordData))
            if(payload.statusCode === "200"){
                setTransactionPinModal(false);
                resetForm();
            }
        }
    })
    return (
        <div className="col-span-10 md:mx-4">
            <Spinner loading={useSelector((state) => state.user).loading} />
            <NavigationHeader title={'User Settings'} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#C3FFC6] hover:scale-105" onClick={()=>setPasswordModal(true)}>
                    <img src={passwordImage} className=" h-16 " alt="" />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Password.</p>
                </div>

                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#FFEFCA] hover:scale-105" onClick={()=>setTransactionPinModal(true)}>
                    <img src={transactionPinImage} alt="" className=" h-16 " />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Transaction Pin.</p>
                </div>
            </div>

            <Modal isVisible={passwordModal} onClose={()=>setPasswordModal(false)}>
            <p className="text-xl text-primary font-medium">Complete the form to Change  Access Password</p>
            <form onSubmit={changeUserPasswordForm.handleSubmit}>
            <div className="grid gap-6 mt-4">
                <PasswordInput labelName={'Old Password'}
                                inputType={'password'}
                                inputName={'oldPassword'}
                                inputValue={changeUserPasswordForm.values.oldPassword}
                                inputOnBlur={changeUserPasswordForm.handleBlur}
                                inputOnChange={changeUserPasswordForm.handleChange}
                                inputError={changeUserPasswordForm.touched.oldPassword && changeUserPasswordForm.errors.oldPassword ? changeUserPasswordForm.errors.oldPassword : null}/>
                <PasswordInput labelName={'New Password'}
                                inputType={'password'}
                                inputName={'newPassword'}
                                inputValue={changeUserPasswordForm.values.newPassword}
                                inputOnBlur={changeUserPasswordForm.handleBlur}
                                inputOnChange={changeUserPasswordForm.handleChange}
                                inputError={changeUserPasswordForm.touched.newPassword && changeUserPasswordForm.errors.newPassword ? changeUserPasswordForm.errors.newPassword : null}/>
                <PasswordInput labelName={'Confirm Password'}
                                inputType={'password'}
                                inputName={'confirmPassword'}
                                inputValue={changeUserPasswordForm.values.confirmPassword}
                                inputOnBlur={changeUserPasswordForm.handleBlur}
                                inputOnChange={changeUserPasswordForm.handleChange}
                                inputError={changeUserPasswordForm.touched.confirmPassword && changeUserPasswordForm.errors.confirmPassword ? changeUserPasswordForm.errors.confirmPassword : null}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
            <Modal isVisible={transactionPinModal} onClose={()=>setTransactionPinModal(false)}>
            <p className="text-xl text-primary font-medium">Complete the form to Change Transaction Pin</p>
            <form onSubmit={changeUserTransactionPinForm.handleSubmit}>
            <div className="grid gap-6 mt-4">
                <PasswordInput labelName={'User Password'}
                               inputName={'password'}
                               inputValue={changeUserTransactionPinForm.values.password}
                               inputOnBlur={changeUserTransactionPinForm.handleBlur}
                               inputOnChange={changeUserTransactionPinForm.handleChange}
                               inputError={changeUserTransactionPinForm.touched.password && changeUserTransactionPinForm.errors.password ? changeUserTransactionPinForm.errors.password : null}/>
                <PasswordInput labelName={'New Transaction Pin (4 Digit Pin)'}
                            inputName={'transactionPin'}
                            inputValue={changeUserTransactionPinForm.values.transactionPin}
                            inputOnBlur={changeUserTransactionPinForm.handleBlur}
                            inputOnChange={changeUserTransactionPinForm.handleChange}
                            inputError={changeUserTransactionPinForm.touched.transactionPin && changeUserTransactionPinForm.errors.transactionPin ? changeUserTransactionPinForm.errors.transactionPin : null}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
        </div>
    );
}

export default UserProfileSettings;