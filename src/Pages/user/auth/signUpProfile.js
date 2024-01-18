import { useEffect, useRef, useState } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import InputWithLabel from "../../../Components/inputWithLabel";
import { openFileInput, previewImage } from "../../../Utils/utils";
import SelectInput from "../../../Components/selectInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showErrorToastMessage } from "../../../Utils/constant";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userCompleteProfile } from "../../../hooks/local/userReducer";

const SignUpProfile = () =>{
    useEffect(() => {
        document.title = "Complete Account | Ardvest";
        document.querySelector('meta[name="description"]').content = "Start your investment journey with a personalized account.";
    }, []);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailAddress = location.state?.emailAddress || "";
    const genderOptions = [{value:'Male', label:'Male'}, {value:'Female', label:'Female'}];
    const [userPassport, setUserPassport] = useState (null);
    const [passportError, setPassportError] = useState(false);
    const userUploadPassportRef = useRef(null);

    const uploadUserPassport = (e)=>{
        const userFile = e.target.files[0];
        if(userFile){
          setUserPassport(userFile);
          setPassportError(false);
        }
        else{
          e.target.value = null;
          setPassportError(true);
        }
        previewImage();
    }

    const updateProfile = useFormik({
      initialValues: {
        firstName :"",
        middleName : "",
        lastName : "",
        address : "",
        gender: "",
        nextOfKin :"",
        bvn :"",
        nextOfKinPhoneNumber : "",
        nextOfKinAddress :""
      },
      validationSchema :Yup.object({
        firstName : Yup.string().required("Firstname cannot be empty"),
        middleName :  Yup.string().required("Middlename cannot be empty"),
        lastName: Yup.string().required("Lastname cannot be empty"),
        address : Yup.string().required("Address cannot be empty"),
        gender: Yup.string().required("Kindly Select a Gender"),
        nextOfKin: Yup.string().required("Next of Kin cannot be empty"),
        nextOfKinPhoneNumber: Yup.string().required("Next of Kin Phone Number cannot be empty")
      }),
      onSubmit:async (values)=>{
        if(!userPassport){
          showErrorToastMessage('Kindly Select a Picture')
          setPassportError(true);
          return;
        }
        const passport = userPassport;
        const { firstName, lastName, middleName, address, gender, bvn, nextOfKin, nextOfKinPhoneNumber,nextOfKinAddress} = values;
        let userProfileData = {emailAddress,  firstName, lastName, middleName, address, gender, bvn, nextOfKin, nextOfKinPhoneNumber,nextOfKinAddress, passport}; 

        const formData = new FormData();
        for(const key in userProfileData){
          formData.append(key, userProfileData[key]);
        }

        const {payload} = await dispatch(userCompleteProfile(formData));
        if(payload.statusCode === "200"){
          navigate("/setUpPin")
        }
      } 
    })
    return (
     <div>
        <AuthHeaders/>
        <Buttons btnType={'Back Button'}/>
        <div className="grid gap-2">
    <p className="text-center text-xl font-semibold text-primary">Tell us a bit about yourself!</p>
    <p className="text-sm text-center">Your details should appear as is on your official documents</p>
  </div>


  <div className="flex justify-center w-full my-5">
    <div className="p-5 w-full md:w-[75%] lg:w-[60%]">
        <div className="flex justify-center">
         <div className="relative">
          <input type="file" id="imageInput" ref={userUploadPassportRef} onChange={uploadUserPassport} accept="image/*" key={userPassport} className="form-control py-3 hidden"/>
          <button onClick={openFileInput} className="absolute h-full w-full flex justify-center items-end">
            <span className="text-xs backdrop-blur-sm bg-white/30 p-2 rounded-lg mb-5 font-medium">Choose Image</span>
          </button>
          {passportError && (<span className="text-red-500 font-bold">Kindly select a picture</span>)}
          <div className="border w-40 h-40 rounded-full bg-cover bg-primary/20" id="imagePreview"></div>
        
         </div>
       
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-end" onSubmit={updateProfile.handleSubmit}>
              <InputWithLabel labelName={'Legal first name'}
                              placeholder={'e.g John'}
                              inputType={'text'}
                              inputName={'firstName'}
                              inputOnBlur={updateProfile.handleBlur}
                              inputOnChange={updateProfile.handleChange}
                              inputValue={updateProfile.values.firstName}
                              inputError={updateProfile.touched.firstName && updateProfile.errors.firstName ? updateProfile.errors.firstName : null}/>
            <InputWithLabel labelName={'Legal middle name'}
                            placeholder={'Bolu'}
                            inputType={'text'} 
                            inputName={'middleName'}
                            inputOnBlur={updateProfile.handleBlur}
                            inputOnChange={updateProfile.handleChange}
                            inputValue={updateProfile.values.middleName}
                            inputError={updateProfile.touched.middleName && updateProfile.errors.middleName ? updateProfile.errors.middleName : null}/>
            <InputWithLabel labelName={'Legal last name'}
                            placeholder={'Doe'}
                            inputType={'text'}
                            inputName={'lastName'}
                            inputOnBlur={updateProfile.handleBlur}
                            inputOnChange={updateProfile.handleChange}
                            inputValue={updateProfile.values.lastName}
                            inputError={updateProfile.touched.lastName && updateProfile.errors.lastName ? updateProfile.errors.lastName : null}/>
            <InputWithLabel labelName={'Home Address'}
                            placeholder={'No 20 xyz Street ...'}
                            inputType={'text'} 
                            inputName={'address'}
                            inputOnBlur={updateProfile.handleBlur}
                            inputOnChange={updateProfile.handleChange}
                            inputValue={updateProfile.values.address}
                            inputError={updateProfile.touched.address && updateProfile.errors.address ? updateProfile.errors.address : null}/>
              <SelectInput  labelName={'Gender'} 
                            selectOptions={genderOptions} 
                            valueKey={'value'} 
                            labelKey={'label'} 
                            selectValue={updateProfile.values.gender}
                            selectBlur={updateProfile.handleBlur}
                            onChange={(event)=>updateProfile.setFieldValue('gender',event.target.value)}
                            selectError={updateProfile.touched.gender && updateProfile.errors.gender ? updateProfile.errors.gender : null}/>
              <InputWithLabel labelName={'Next of kin'}
                              placeholder={'Bolu Doe'}
                              inputType={'text'}
                              inputName={'nextOfKin'}
                              inputOnBlur={updateProfile.handleBlur}
                              inputOnChange={updateProfile.handleChange}
                              inputValue={updateProfile.values.nextOfKin}
                              inputError={updateProfile.touched.nextOfKin && updateProfile.errors.nextOfKin ? updateProfile.errors.nextOfKin : null}/>
              <InputWithLabel labelName={'Bank Verification Number (BVN)'}
                              placeholder={'01234567891'}
                              inputType={'number'}
                              inputName={'bvn'}
                              inputOnBlur={updateProfile.handleBlur}
                              inputOnChange={updateProfile.handleChange}
                              inputValue={updateProfile.values.bvn}/>
             <InputWithLabel labelName={'Next of Kin Phonenumber'}
                             placeholder={'08012345678'}
                             inputType={'number'}
                             inputName={'nextOfKinPhoneNumber'}
                             inputOnBlur={updateProfile.handleBlur}
                             inputOnChange={updateProfile.handleChange}
                             inputValue={updateProfile.values.nextOfKinPhoneNumber}
                             inputError={updateProfile.touched.nextOfKinPhoneNumber && updateProfile.errors.nextOfKinPhoneNumber ? updateProfile.errors.nextOfKinPhoneNumber : null}/>
            <InputWithLabel labelName={'Next of Kin Address'}
                            placeholder={'No 20 xyz Street ...'}
                            inputType={'text'}
                            inputName={'nextOfKinAddress'}
                            inputOnBlur={updateProfile.handleBlur}
                            inputOnChange={updateProfile.handleChange}
                            inputValue={updateProfile.values.nextOfKinAddress}/>
             <Buttons btnText={passportError ?'Kindly Select a Picture' : 'Continue'}
                        btnType={'primary'} type={'submit'}/>
        </form>
    </div>
  </div>
     </div>
    );
}
export default SignUpProfile;