
const ReadOnlyInputWithLabel = ({ labelName, inputType, placeholder, inputValue, inputName}) => {
    return (  
        <div className="grid">
        <span className="text-sm font-medium pb-1 text-primary">{labelName}:</span>
        <input type={inputType} value={inputValue} name={inputName} readOnly className="p-3 bg-[#f8f8f8] border text-sm rounded text-primary focus:border-black focus:border-2 focus:outline-none" placeholder={placeholder} />
    </div>
    );
}
 
export default ReadOnlyInputWithLabel;