
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import { useEffect } from "react";
import { clearOTP, handleInput } from "../../../Utils/utils";
import OtpInputs from "../../../Components/otpInputs";
import pinIcon from "../../../assets/icons/lock.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { showErrorToastMessage } from "../../../Utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../Components/spinner";
import { userTransactionPin } from "../../../hooks/local/userReducer";
const CreatePin = () => {
    useEffect(() => {
        document.title = "Set Pin | Ardvest";
        document.querySelector('meta[name="description"]').content = "Start your investment journey with a personalized account";
    }, []);
 
    const clearUserOTP = () => {
        clearOTP();
        document.getElementById('userInput').value = "";
    }
    const handlePinInput = (currentInput)=>{
        const userInput = handleInput(currentInput);
        createUserPin.setFieldValue('userPin', userInput);
    }
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state)=>state.user);
    const emailAddress = location.state?.emailAddress || "";

    const createUserPin = useFormik({
        initialValues:{
            emailAddress : emailAddress,
            userPin : ""
        },
        onSubmit: async(values)=>{
            if(values.userPin === ""){
                showErrorToastMessage("Transaction Pin Cannot be empty");
                return;
            }
            const {emailAddress, userPin} = values;
            let createPinData = {emailAddress, userPin};
            const { payload } = await dispatch(userTransactionPin(createPinData));
            if(payload.statusCode === "200"){
                navigate('/profileComplete');
            }
        }
    })
    return (
        <div>
            <AuthHeaders />
            <Buttons btnType={'backButton'} />
            <Spinner loading={users.loading} />
            <div className="grid gap-2">
                <img src={pinIcon} alt="" className="justify-self-center mb-5"/>
                    <p className="text-center text-xl font-semibold text-primary">Create a new PIN</p>
                    <p className="text-sm text-center">This PIN should be a secure 4 (four)-digit PIN to confirm transactions when using the app</p>
            </div>

            <div className="flex justify-center w-full my-5">
                <div className="p-5 w-full md:w-[75%] lg:w-[40%]">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold">Enter Pin:</p>
                        <p className="text-sm font-semibold text-primary/50 cursor-pointer" onClick={clearUserOTP}>Clear Pin</p>
                    </div>
                    <div className="grid grid-cols-4 gap-10  mt-2 mb-12" id="inputs" >
                        {
                        [{id: 'digit1'},{id:'digit2'},{id:'digit3'},{id:'digit4'}].map(
                            ({id})=>(
                                <OtpInputs id={id} onChange={handlePinInput}/>
                            )
                        )                    
                        }
                    </div>
                    <form onSubmit={createUserPin.handleSubmit}>
                    <input name="userPin" type="text" id="userInput" value={createUserPin.values.userPin} onChange={createUserPin.handleChange} onBlur={createUserPin.handleBlur}  hidden />

                    <Buttons btnType={'primary'} btnText={'Create PIN'} type={'submit'}/>

                    </form>
                </div>
            </div>
        </div>

    );
}
export default CreatePin;