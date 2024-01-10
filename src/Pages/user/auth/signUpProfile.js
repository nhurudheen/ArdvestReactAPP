import { useEffect } from "react";
import AuthHeaders from "../../../Components/authHeader";
import Buttons from "../../../Components/buttons";
import { useParams } from "react-router-dom";
import InputWithLabel from "../../../Components/inputWithLabel";
import { previewImage, openFileInput } from "../../../Components/utils";

const SignUpProfile = () =>{
    useEffect(() => {
        document.title = "Complete Account | Ardvest";
        document.querySelector('meta[name="description"]').content = "Start your investment journey with a personalized account.";
    }, []);
    let { emailAddress } = useParams();
    emailAddress = atob(emailAddress);
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
          <input type="file" id="imageInput" onChange={previewImage} accept="image/*" className="form-control py-3 hidden"/>
          <button onClick={openFileInput} className="absolute h-full w-full flex justify-center items-end">
            <span className="text-xs backdrop-blur-sm bg-white/30 p-2 rounded-lg mb-5 font-medium">Choose Image</span>
          </button>
          <div className="border w-40 h-40 rounded-full bg-cover bg-primary/20" id="imagePreview"></div>
         </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 items-end">
              <InputWithLabel labelName={'Legal first name'}
                              placeholder={'e.g John'}
                              inputType={'email'}/>
            <InputWithLabel labelName={'Legal middle name'}
                            placeholder={'Bolu'}
                            inputType={'text'}/>
            <InputWithLabel labelName={'Legal last name'}
                            placeholder={'Doe'}
                            inputType={'text'}/>
            <InputWithLabel labelName={'Home Address'}
                            placeholder={'No 20 xyz Street ...'}
                            inputType={'text'}/>
              <div className="grid">
                <span className="text-sm font-medium">Gender:</span>
                <select name="" id="" className="p-3 bg-[#f8f8f8] border text-sm rounded">
                  <option value="" disabled selected >Select a gender</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                </select>    
              </div>
              <InputWithLabel labelName={'Next of kin'}
                              placeholder={'Bolu Doe'}
                              inputType={'text'}/>
              <InputWithLabel labelName={'Bank Verification Number (BVN)'}
                              placeholder={'01234567891'}
                              inputType={'number'}/>
             <InputWithLabel labelName={'Next of Kin Phonenumber'}
                             placeholder={'08012345678'}
                             inputType={'number'}/>
            <InputWithLabel labelName={'Next of Kin Address'}
                            placeholder={'No 20 xyz Street ...'}
                            inputType={'text'}/>
           <Buttons btnText={'Continue'}
                        btnType={'primary'}/>
        </div>
    </div>
  </div>
     </div>
    );
}
export default SignUpProfile;