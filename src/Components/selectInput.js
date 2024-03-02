const SelectInput = ({ labelName, selectOptions, valueKey, labelKey, selectError, selectValue, selectBlur, selectName, onChange}) => {
    return (
        <div className="grid">
            <span className="text-sm font-medium">{labelName}:</span>
            <select type="text" value={selectValue} onBlur={selectBlur} name={selectName} onChange={onChange}  className="p-3 bg-[#f8f8f8] border text-sm rounded text-primary">
                <option value="" disabled selected defaultValue>Select a {labelName}</option>
                {
                    selectOptions.map((option) => (
                        <option key={option[valueKey]} value={option[valueKey]}>{option[labelKey]} </option>))
                }
            </select>
            <code className="text-red-500 text-xs">{selectError}</code>
        </div>
    );
}
export default SelectInput;