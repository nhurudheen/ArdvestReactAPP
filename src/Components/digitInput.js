import { useDigitInput } from "../Utils/utils";


const DigitInput = ({ labelName, inputType, placeholder, inputValue, inputOnChange,inputOnBlur,inputError, inputName, maxLength }) => {
    useDigitInput();
    return (
        <div className="grid">
            <span className="text-sm font-medium pb-1 text-primary">{labelName}:</span>
            <input type={inputType} value={inputValue} name={inputName} maxLength={maxLength} onBlur={inputOnBlur} onChange={inputOnChange} className="p-3 bg-[#f8f8f8] text-primary border text-sm rounded focus:border-black focus:border-2 focus:outline-none digitFormat" placeholder={placeholder} />
            <code className="text-red-500 text-xs">{inputError}</code>
        </div>
    )
}
 
export default DigitInput;