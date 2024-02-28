import { useEffect, useState } from "react";
import NavigationHeader from "../../../Components/navigationHeader";
import Spinner from "../../../Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import passwordResetImage from "../../../assets/images/passwordReset.png";
import pinResetImage from "../../../assets/images/pinReset.png";
import bankAccountResetImage from "../../../assets/images/bankAccount.png";
import Modal from "../../../Components/modals";
import PasswordInput from "../../../Components/passwordInput";
import Buttons from "../../../Components/buttons";
import DigitInput from "../../../Components/digitInput";
import InputWithLabel from "../../../Components/inputWithLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateAdminPassword, updateAdminTransactionPin, updateDepositBankAccount } from "../../../hooks/local/adminReducer";
import { useGetBankDetails } from "../adminLayout/reusableEffect";
import { useNavigate } from "react-router-dom";
const Settings = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Settings");
        document.title = "Settings | Ardvest";
        document.querySelector('meta[name="description"]').content = "Your access point to intelligent administration and tailored wealth expansion.";
    }, [setPageTitle]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bankAccountData = useGetBankDetails();
    const emailAddress = useSelector((state)=>state.admin.adminSessionData).emailAddress;
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [changePinModal, setChangePinModal] = useState(false);
    const [changeBankAccountModal, setChangeBankAccountModal] = useState(false);

    const changePasswordForm = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
     validationSchema: Yup.object({
        oldPassword: Yup.string().required("Kindly enter the former password"),
        newPassword: Yup.string().required("New password cannot be empty"),
        confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
     }),
        onSubmit: async (values) => {
            const {oldPassword, newPassword, confirmPassword} = values;
            let passwordData = {emailAddress, oldPassword, newPassword, confirmPassword};
            const {payload} = await dispatch(updateAdminPassword(passwordData));
            if(payload.statusCode === "200"){
                setChangePasswordModal(false);
            }
        },
    })
    const changeTransactionPinForm = useFormik({
        initialValues: {
            password: "",
            transactionPin: ""
        },
     validationSchema: Yup.object({
        password: Yup.string().required("Admin Password cannot be empty"),
        transactionPin: Yup.string().required("Transaction Pin cannot be empty")
     }),
        onSubmit: async (values) => {
            const {password, transactionPin} = values;
            let transactionPinData = {emailAddress, password, transactionPin};
            const {payload} = await dispatch(updateAdminTransactionPin(transactionPinData));
            if(payload.statusCode === "200"){
                setChangePinModal(false);
            }
        },
    })
    const depositBankAccountForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            accountName: bankAccountData?.accountName ? bankAccountData.accountName: '',
            accountNumber: bankAccountData?.accountNumber ? bankAccountData.accountNumber: '',
            bankName: bankAccountData?.bankName ? bankAccountData.bankName: '',
            password:""
        },
     validationSchema: Yup.object({
        accountName: Yup.string().required("Account Name cannot be empty"),
        accountNumber: Yup.number().required("Account Number cannot be empty"),
        bankName: Yup.string().required("Bank Name cannot be empty"),
        password: Yup.string().required("Kindly enter Administrative Password"),
     }),
        onSubmit: async (values, {resetForm}) => {
            const {accountName, accountNumber, bankName, password} = values;
            let bankData = {emailAddress, accountName, accountNumber, bankName, password};
            const {payload} = await dispatch(updateDepositBankAccount(bankData));
            if(payload.statusCode === "200"){
                resetForm();
                setChangeBankAccountModal(false);
            //    window.location.reload();
            }
        },
    })

    return (
        <div className="col-span-10">
            <NavigationHeader title={'Admin Settings'} />
            <Spinner loading={useSelector((state) => state.admin).loading} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#C3FFC6] hover:scale-105" onClick={() => setChangePasswordModal(true)}>
                    <img src={passwordResetImage} className=" h-16 " alt="" />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Password.</p>
                </div>


                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#FFEFCA] hover:scale-105" onClick={() => setChangePinModal(true)}>
                    <img src={pinResetImage} className=" h-16 " alt="" />
                    <p className="overflow-hidden text-lg font-semibold pt-4">Change Transaction Pin.</p>
                </div>


                <div className="flex flex-col border p-4 rounded-lg justify-center items-center bg-[#C3FFC6] hover:scale-105" onClick={() => setChangeBankAccountModal(true)}>
                    <img src={bankAccountResetImage} className=" h-[70px] " alt="" />
                    <p className="overflow-hidden text-lg font-semibold pt-2">Update Deposit Bank Account.</p>
                </div>

            </div>

            <Modal isVisible={changePasswordModal} onClose={() => setChangePasswordModal(false)}>
                <p className="text-xl text-primary font-medium">Complete the form to Change Admin Access Password</p>
                <form className="grid gap-6 mt-4" onSubmit={changePasswordForm.handleSubmit}>
                    <PasswordInput labelName={'Old Password'}
                                    inputName={'oldPassword'}
                                    inputOnBlur={changePasswordForm.handleBlur}
                                    inputOnChange={changePasswordForm.handleChange}
                                    inputValue={changePasswordForm.values.oldPassword}
                                    inputError={changePasswordForm.touched.oldPassword && changePasswordForm.errors.oldPassword ? changePasswordForm.errors.oldPassword : null}/>
                    <PasswordInput labelName={'New Password'}
                                    inputName={'newPassword'}
                                    inputOnBlur={changePasswordForm.handleBlur}
                                    inputOnChange={changePasswordForm.handleChange}
                                    inputValue={changePasswordForm.values.newPassword}
                                    inputError={changePasswordForm.touched.newPassword && changePasswordForm.errors.newPassword ? changePasswordForm.errors.newPassword : null}/>
                    <PasswordInput labelName={'Confirm Password'}
                                    inputName={'confirmPassword'}
                                    inputOnBlur={changePasswordForm.handleBlur}
                                    inputOnChange={changePasswordForm.handleChange}
                                    inputValue={changePasswordForm.values.confirmPassword}
                                    inputError={changePasswordForm.touched.confirmPassword && changePasswordForm.errors.confirmPassword ? changePasswordForm.errors.confirmPassword : null}/>
                    <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
                </form>
            </Modal>
            <Modal isVisible={changePinModal} onClose={() => setChangePinModal(false)}>
                <p className="text-xl text-primary font-medium">Complete the form to Change Admin Transaction Pin</p>
                <form className="grid gap-6 mt-4" onSubmit={changeTransactionPinForm.handleSubmit}>
                    <PasswordInput labelName={'Admin Password'}  
                                    inputName={'password'}
                                    inputOnBlur={changeTransactionPinForm.handleBlur}
                                    inputOnChange={changeTransactionPinForm.handleChange}
                                    inputValue={changeTransactionPinForm.values.password}
                                    inputError={changeTransactionPinForm.touched.password && changeTransactionPinForm.errors.password ? changeTransactionPinForm.errors.password : null}/>
                    <DigitInput labelName={'New Transaction Pin (4 digit Pin)'}
                                maxLength={'4'}
                                inputType={'password'}  
                                inputName={'transactionPin'}
                                inputOnBlur={changeTransactionPinForm.handleBlur}
                                inputOnChange={changeTransactionPinForm.handleChange}
                                inputValue={changeTransactionPinForm.values.transactionPin}
                                inputError={changeTransactionPinForm.touched.transactionPin && changeTransactionPinForm.errors.transactionPin ? changeTransactionPinForm.errors.transactionPin : null}/>
                    <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
                </form>
            </Modal>
            <Modal isVisible={changeBankAccountModal} onClose={() => setChangeBankAccountModal(false)}>
                <p className="text-xl text-primary font-medium">Complete the form to Change Deposit Bank Details</p>
               <form className="grid gap-6 mt-4" onSubmit={depositBankAccountForm.handleSubmit}>
               <InputWithLabel labelName={'Account Name'}
                               inputType={'text'} 
                               inputName={'accountName'}
                               inputOnBlur={depositBankAccountForm.handleBlur}
                               inputOnChange={depositBankAccountForm.handleChange}
                               inputValue={depositBankAccountForm.values.accountName}
                               inputError={depositBankAccountForm.touched.accountName && depositBankAccountForm.errors.accountName ? depositBankAccountForm.errors.accountName : null}/>
                <InputWithLabel labelName={'Account Number'}
                                inputType={'text'}
                                inputName={'accountNumber'}
                                inputOnBlur={depositBankAccountForm.handleBlur}
                                inputOnChange={depositBankAccountForm.handleChange}
                                inputValue={depositBankAccountForm.values.accountNumber}
                                inputError={depositBankAccountForm.touched.accountNumber && depositBankAccountForm.errors.accountNumber ? depositBankAccountForm.errors.accountNumber : null}/>
                <InputWithLabel labelName={'Bank Name'}
                                inputType={'text'}
                                inputName={'bankName'}
                                inputOnBlur={depositBankAccountForm.handleBlur}
                                inputOnChange={depositBankAccountForm.handleChange}
                                inputValue={depositBankAccountForm.values.bankName}
                                inputError={depositBankAccountForm.touched.bankName && depositBankAccountForm.errors.bankName ? depositBankAccountForm.errors.bankName : null}/>
                <PasswordInput labelName={'Admin Password'}
                               inputName={'password'}
                               inputOnBlur={depositBankAccountForm.handleBlur}
                               inputOnChange={depositBankAccountForm.handleChange}
                               inputValue={depositBankAccountForm.values.password}
                               inputError={depositBankAccountForm.touched.password && depositBankAccountForm.errors.password ? depositBankAccountForm.errors.password : null}/>
                <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} />
               </form>
            </Modal>

        </div>
    );
}

export default Settings;