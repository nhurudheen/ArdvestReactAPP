import { useEffect, useState } from "react";
import Spinner from "../../../Components/spinner";
import { useSelector } from "react-redux";
import NavigationHeader from "../../../Components/navigationHeader";
import passwordImage from "../../../assets/images/passwordReset.png";
import transactionPinImage from "../../../assets/images/pinReset.png";
import Modal from "../../../Components/modals";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import DigitInput from "../../../Components/digitInput";
import { useFormik } from "formik";
import * as Yup from 'yup';

const UserProfileSettings = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Settings");
        document.title = "Settings | Ardvest";
        document.querySelector('meta[name="description"]').content = "Ardvest User Account Settings.";
    }, [setPageTitle]);
    const emailAddress = useSelector((state)=>state.user.userSessionData).userEmailAddress;
    const [passwordModal, setPasswordModal] = useState(false);
    const [transactionPinModal, setTransactionPinModal] = useState(false);
    const changeUserPassword = useFormik({
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
        onSubmit: async(values)=>{
            const {oldPassword,newPassword,confirmPassword} = values;
            let passwordData =  {emailAddress, oldPassword,newPassword,confirmPassword};
            console.log(passwordData);
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
            <form onSubmit={changeUserPassword.handleSubmit}>
            <div className="grid gap-6 mt-4">
                <InputWithLabel labelName={'Old Password'}
                                inputType={'password'}
                                inputName={'oldPassword'}
                                inputValue={changeUserPassword.values.oldPassword}
                                inputOnBlur={changeUserPassword.handleBlur}
                                inputOnChange={changeUserPassword.handleChange}
                                inputError={changeUserPassword.touched.oldPassword && changeUserPassword.errors.oldPassword ? changeUserPassword.errors.oldPassword : null}/>
                <InputWithLabel labelName={'New Password'}
                                inputType={'password'}
                                inputName={'newPassword'}
                                inputValue={changeUserPassword.values.newPassword}
                                inputOnBlur={changeUserPassword.handleBlur}
                                inputOnChange={changeUserPassword.handleChange}
                                inputError={changeUserPassword.touched.newPassword && changeUserPassword.errors.newPassword ? changeUserPassword.errors.newPassword : null}/>
                <InputWithLabel labelName={'Confirm Password'}
                                inputType={'password'}
                                inputName={'confirmPassword'}
                                inputValue={changeUserPassword.values.confirmPassword}
                                inputOnBlur={changeUserPassword.handleBlur}
                                inputOnChange={changeUserPassword.handleChange}
                                inputError={changeUserPassword.touched.confirmPassword && changeUserPassword.errors.confirmPassword ? changeUserPassword.errors.confirmPassword : null}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
            <Modal isVisible={transactionPinModal} onClose={()=>setTransactionPinModal(false)}>
            <p className="text-xl text-primary font-medium">Complete the form to Change Transaction Pin</p>
            <form onSubmit={''}>
            <div className="grid gap-6 mt-4">
                <InputWithLabel labelName={'Password'}
                                inputType={'password'}/>
                <DigitInput labelName={'New Transaction Pin (4 Digit Pin):'}
                            maxLength={'4'}
                            inputType={'password'}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
            </div>
            </form>
            </Modal>
        </div>
    );
}

export default UserProfileSettings;