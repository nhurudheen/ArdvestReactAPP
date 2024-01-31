import closeIcon from "../assets/icons/close.svg";
import ardvestLogo from  "../assets/icons/logo.svg";
const TransactionModal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50">
            <div className="flex items-center justify-center h-[100vh]">

                <div className="bg-white py-8 px-6 md:px-8 rounded-lg w-[90%] md:w-[50%] lg:w-[30%] grid max-h-[80%] md:max-h-[90%] overflow-y-scroll relative">
                    <div className="flex justify-between mt-2 mb-6">
                        <div></div>
                        <img src={ardvestLogo} className="justify-center" alt="" />
                        <img src={closeIcon} alt="" className="justify-self-end mb-4" onClick={() => onClose()} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default TransactionModal;