import closeIcon from "../assets/icons/close.svg";
const Modal = ({isVisible, onClose, children}) => {
    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 ">
            <div className="flex items-center justify-center h-[100vh]">
                <div className="bg-white py-8 px-8 rounded-lg w-[90%] md:w-[50%] lg:w-[40%] grid max-h-[80%] md:max-h-[90%] overflow-y-scroll relative">
                    <img src={closeIcon} alt="" className="justify-self-end mb-4" onClick={()=>onClose()} />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;