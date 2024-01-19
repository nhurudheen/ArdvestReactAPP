import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import Modal from "../../../Components/modals";
import emailIcon from "../../../assets/icons/email.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../../../Components/passwordInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userResetPassword } from "../../../hooks/local/userReducer";
import Spinner from "../../../Components/spinner";

const ResetPassword = () => {
    useEffect(() => {
        document.title = "Reset Password | Ardvest";
        document.querySelector('meta[name="description"]').content = "Reset Password to validate your account for your investment";
    }, []);
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const emailAddress = location.state?.emailAddress||"";
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const users = useSelector((state)=>state.user) 

    const createNewPasswordFom = useFormik(
        {
            initialValues :{
                emailAddress : emailAddress,
                password : "",
                confirmPassword : "",
            },
            validationSchema : Yup.object({
                password: Yup.string().required("Password cannot be empty").matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#.?&]{6,}$/,
                    "Password Criteria does't match"
                ),
                confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            }),
            onSubmit: async(values)=>{
                const {emailAddress, password, confirmPassword} = values;
                let passwordData = {emailAddress,password,confirmPassword};
                const { payload } = await dispatch(userResetPassword(passwordData));
                if(payload.statusCode === "200"){
                    setShowModal(true);
                }
            }
        }
    )
    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'back button'} />
            <Spinner loading={users.loading}/>
            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Reset your password!</p>
                <p className="text-sm text-center">Create a new password</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <form onSubmit={createNewPasswordFom.handleSubmit} className="grid gap-8">
                    <PasswordInput labelName={'New Password'}
                            inputType={'password'}
                            inputName={'password'}
                            placeholder={'*********************'}
                            inputOnBlur ={createNewPasswordFom.handleBlur}
                            inputValue={createNewPasswordFom.values.password}
                            inputError={createNewPasswordFom.touched.password && createNewPasswordFom.errors.password ? createNewPasswordFom.errors.password : null} 
                            inputOnChange={(e) => {
                                setPassword(e.target.value);
                                createNewPasswordFom.handleChange(e);
                            }
                            } />
                       <PasswordInput labelName={'Confirm Password'}
                                    inputType={'password'}
                                    inputName={'confirmPassword'}
                                    placeholder={'*********************'}
                                    inputOnBlur ={createNewPasswordFom.handleBlur}
                                    inputValue={createNewPasswordFom.values.confirmPassword}
                                    inputError={createNewPasswordFom.touched.confirmPassword && createNewPasswordFom.errors.confirmPassword ? createNewPasswordFom.errors.confirmPassword : null} 
                                    inputOnChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        createNewPasswordFom.handleChange(e);
                                    }} />

                            <ul className="list-disc list-inside text-sm text-semibold font-medium">
                                <li className="list-none mb-2 ">Your password must contain:</li>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        {[
                                            { label: 'At least 1 digit', regex: /\d/ },
                                            { label: 'At least 1 upper case', regex: /[A-Z]/ },
                                            { label: 'At least 1 lower case', regex: /[a-z]/ },
                                        ].map(({ label, regex, condition }) => (
                                            <div key={label}>
                                                <input type="checkbox" readOnly  className="me-2" disabled={!condition} checked={condition || (regex && regex.test(password))} />
                                                <label className={`${(condition || (regex && regex.test(password))) ? 'text-primary' : 'text-black'}`}>{label}</label>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {[
                                    
                                            { label: 'At least 6 characters', regex: /.{6,}/ },
                                            { label: 'At least 1 special character', regex: /[!@#$%^&*(),.?":{}|<>]/ },
                                            { label: 'Matching Password', condition: password !== '' && confirmPassword !== '' && password === confirmPassword },
                                        ].map(({ label, regex, condition }) => (
                                            <div key={label}>
                                                <input type="checkbox" readOnly  className="me-2" disabled={!condition} checked={condition || (regex && regex.test(password))} />
                                                <label className={`${(condition || (regex && regex.test(password))) ? 'text-primary' : 'text-black'}`}>{label}</label>
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                
                                </div>
                            </ul>
                        <div className="pt-6">
                            <Buttons btnText={'Reset'} btnType={'primary'} type={'submit'} />
                        </div>
                    </form>
                </div>
            </div>
            <Modal isVisible={showModal} onClose={()=>setShowModal(false)}>
                <div className="flex justify-center">
                    <img src={emailIcon} alt="" className=" h-48 rounded-lg my-4 object-fit"/></div>
                <p className="text-xl text-primary font-medium mt-8 text-center">Success</p>
                <p className="text-sm text-[#c4c4c4] font-medium mt-2 mb-8 text-center">Your password has been reset. Please login with your new password</p>

               <Link to={'/auth'}><Buttons btnType={'primary'} btnText={'Login'}/></Link>
            </Modal>
        </div>

    );
}

export default ResetPassword;