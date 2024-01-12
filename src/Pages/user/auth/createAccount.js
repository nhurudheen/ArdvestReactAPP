import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../../Components/passwordInput";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../hooks/local/userReducer";
import Spinner from "../../../Components/spinner";

const CreateAccount = () => {
    useEffect(() => {
        document.title = "Create Account | Ardvest";
        document.querySelector('meta[name="description"]').content = "Join Ardvest: Start your investment journey with a personalized account.";
    }, []);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>state.user) 
    const createAccountForm = useFormik(
        {
            initialValues :{
                emailAddress : "",
                phoneNumber : "",
                password : "",
                confirmPassword : "",
            },
            validationSchema : Yup.object({
                emailAddress: Yup.string().email("Invalid Email Address").required("Email is required"),
                phoneNumber: Yup.number().required("Phone Number cannot be empty").typeError('Invalid Phone Number Format').max(9999999999,'Phone Number has to be 11 digit').min(999999999,'Phone Number has to be 11 digit'),
                password: Yup.string().required("Password cannot be empty").matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    "Password Criteria does't match"
                ),
                confirmPassword: Yup.string()
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            }),
            onSubmit: async(values)=>{
                const {emailAddress, phoneNumber, password, confirmPassword} = values;
                let userRegistrationData = {emailAddress,phoneNumber,password,confirmPassword};
                const { payload } = await dispatch(userRegistration(userRegistrationData));
                if(payload.statusCode === "200"){
                    navigate('/verifyEmail', {state: {emailAddress}});
                }
            }
        }
    )

    return (
        <div className="relative">
            <Spinner loading={users.loading}/>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />

            <div className="grid gap-2">
                <p className="text-center text-xl font-semibold text-primary">Get started right away!</p>
                <p className="text-sm text-center">Input your details</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <form className="grid gap-8" onSubmit={createAccountForm.handleSubmit} >
                        <InputWithLabel labelName={'Email Address'}
                            inputType={'email'}
                            inputName={'emailAddress'}
                            inputOnChange={createAccountForm.handleChange}
                            inputOnBlur ={createAccountForm.handleBlur}
                            inputValue={createAccountForm.values.emailAddress}
                            inputError={createAccountForm.touched.emailAddress && createAccountForm.errors.emailAddress ? createAccountForm.errors.emailAddress : null}
                            placeholder={'e.g johndoe@xyz.com'} />
                        <InputWithLabel labelName={'Phone number'}
                            inputType={'number'}
                            inputName={'phoneNumber'}
                            placeholder={'e.g 08123456789'}
                            inputOnChange={createAccountForm.handleChange}
                            inputOnBlur ={createAccountForm.handleBlur}
                            inputValue={createAccountForm.values.phoneNumber}
                            inputError={createAccountForm.touched.phoneNumber && createAccountForm.errors.phoneNumber ? createAccountForm.errors.phoneNumber : null} />
                        <PasswordInput labelName={'Password'}
                            inputType={'password'}
                            inputName={'password'}
                            placeholder={'*********************'}
                            inputOnBlur ={createAccountForm.handleBlur}
                            inputValue={createAccountForm.values.password}
                            inputError={createAccountForm.touched.password && createAccountForm.errors.password ? createAccountForm.errors.password : null} 
                            inputOnChange={(e) => {
                                setPassword(e.target.value);
                                createAccountForm.handleChange(e);
                            }
                            } />
                        <PasswordInput labelName={'Confirm Password'}
                            inputType={'password'}
                            inputName={'confirmPassword'}
                            placeholder={'*********************'}
                            inputOnBlur ={createAccountForm.handleBlur}
                            inputValue={createAccountForm.values.confirmPassword}
                            inputError={createAccountForm.touched.confirmPassword && createAccountForm.errors.confirmPassword ? createAccountForm.errors.confirmPassword : null} 
                            inputOnChange={(e) => {
                                setConfirmPassword(e.target.value);
                                createAccountForm.handleChange(e);
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

                        <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'}  />
                        <p className="text-center text-sm">If you already created an account, <Link to={'/auth'}><span className="text-primary">Login</span></Link></p>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateAccount;