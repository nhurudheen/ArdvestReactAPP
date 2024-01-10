const InputWithLabel = ({ labelName, inputType, placeholder }) => {
    return (
        <div className="grid">
            <span className="text-sm font-medium pb-1">{labelName}:</span>
            <input type={inputType} name="" className="p-3 bg-[#f8f8f8] border text-sm rounded" placeholder={placeholder} />
        </div>
    )
}
export default InputWithLabel;