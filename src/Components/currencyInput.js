import { useCurrencyDigit } from "../Utils/utils";

const CurrencyInput = ({ labelName, inputType, placeholder, inputValue, inputOnChange,inputOnBlur,inputError, inputName }) => {
    useCurrencyDigit(inputOnChange);
    return (
        <div className="grid w-full">
            <span className="text-sm font-medium pb-1 text-primary">{labelName}:</span>
            <input type={inputType} value={inputValue} name={inputName} onBlur={inputOnBlur} onChange={inputOnChange} className="p-3 bg-[#f8f8f8] border text-sm rounded text-primary  currencyDigit" placeholder={placeholder} />
            <code className="text-red-500 text-xs">{inputError}</code>
        </div>
    )
}
 
export default CurrencyInput;