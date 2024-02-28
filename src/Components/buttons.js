import backSvg from "../assets/icons/arrow.svg";
const Buttons = ({ btnText, btnType, onClick, type }) => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <div>
            {btnType === "primary" ?
                (
                    <button onClick={onClick} type={type} className="bg-primary text-center px-8 py-4 text-sm rounded text-white w-full">{btnText}</button>
                )
                :
                btnType === "secondary" ?
                    (
                        <button type={type}  onClick={onClick} className="border border-primary text-primary text-center px-8 py-4 text-sm rounded w-full">{btnText}</button>

                    )
                    :
                btnType === "delete"?
                (
                    <button onClick={onClick} type={type} className="bg-red-500 text-center px-8 py-4 text-sm rounded text-white w-full">{btnText}</button>
                )
                :
                    (
                        <div className="px-3 md:px-8 mt-8">
                            <img src={backSvg} alt="" onClick={goBack} className="cursor-pointer" />
                        </div>
                    )
            }
        </div>
    );
}

export default Buttons;