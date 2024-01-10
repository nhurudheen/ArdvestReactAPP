import {handleInput } from "./utils";
const OtpInputs = ({ id }) => {
    const handleInputChange = (event) => {
        handleInput(event.target);
    }
    return (
        <input type="text" required inputMode="numeric" name="" id={id} maxLength="1" onInput={handleInputChange} className="bg-gray-100 p-4 text-center font-bold rounded-lg focus:outline-primary input" />
    );
}
export default OtpInputs;