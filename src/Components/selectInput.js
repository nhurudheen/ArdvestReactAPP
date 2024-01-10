const SelectInput = ({ labelName, selectOptions, valueKey, labelKey}) => {
    return (
        <div className="grid">
            <span className="text-sm font-medium">{labelName}:</span>
            <select name="" id="" className="p-3 bg-[#f8f8f8] border text-sm rounded">
                <option value="" disabled selected defaultValue>Select a {labelName}</option>
                {
                    selectOptions.map((option) => (
                        <option key={option[valueKey]} value={option[valueKey]}>{option[labelKey]} </option>))
                }
            </select>
        </div>
    );
}
export default SelectInput;