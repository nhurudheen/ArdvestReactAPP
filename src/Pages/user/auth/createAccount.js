import { useEffect, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { Link } from "react-router-dom";
import PasswordInput from "../../../Components/passwordInput";

const CreateAccount = () => {
    useEffect(() => {
        document.title = "Create Account | Ardvest";
        document.querySelector('meta[name="description"]').content = "Join Ardvest: Start your investment journey with a personalized account.";
    }, []);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabledButton, setDisabledButton] = useState(true);
    const [password, setPassword] = useState(" ");

    const checkPasswordCriteria = () => {
        const hasDigit = /\d/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 6;
        const passwordsMatch = password === confirmPassword;
        setDisabledButton(!(hasDigit && hasUpperCase && hasLowerCase && hasSpecialChar && hasMinLength && passwordsMatch));
        console.log(disabledButton)
    };
    


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
                    <form className="grid gap-8" >
                        <InputWithLabel labelName={'Email Address'}
                            inputType={'email'}
                            inputName={'emailAddress'}
                            placeholder={'e.g johndoe@xyz.com'} />
                        <InputWithLabel labelName={'Phone number'}
                            inputType={'number'}
                            inputName={'phoneNumber'}
                            placeholder={'e.g 08123456789'} />
                        <PasswordInput labelName={'Password'}
                            inputType={'password'}
                            inputName={'password'}
                            placeholder={'*********************'}
                            inputOnChange={(e) => {
                                setPassword(e.target.value);
                                checkPasswordCriteria();
                            }} />
                        <PasswordInput labelName={'Confirm Password'}
                            inputType={'password'}
                            inputName={'confirmPassword'}
                            placeholder={'*********************'}
                            inputOnChange={(e) => {
                                setConfirmPassword(e.target.value);
                                checkPasswordCriteria();
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
                                            <input type="checkbox"  className="me-2" disabled={!condition} checked={condition || (regex && regex.test(password))} />
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
                                            <input type="checkbox"  className="me-2" disabled={!condition} checked={condition || (regex && regex.test(password))} />
                                            <label className={`${(condition || (regex && regex.test(password))) ? 'text-primary' : 'text-black'}`}>{label}</label>
                                            <br />
                                        </div>
                                    ))}
                                </div>
                             
                            </div>
                        </ul>

                        <Buttons btnText={'Continue'} btnType={'primary'} type={'submit'} disabled={disabledButton} />
                        <p className="text-center text-sm">If you already created an account, <Link to={'/auth'}><span className="text-primary">Login</span></Link></p>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default CreateAccount;