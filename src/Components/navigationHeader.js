import backSvg from "../assets/icons/arrow.svg";
const NavigationHeader = ({title}) => {
    const goBack = () => {
        window.history.back();
    };
    return ( 
        <div className="flex items-center gap-3">
             <img src={backSvg} alt="" onClick={goBack}/>
            <span className="text-lg text-primary font-semibold">{title}</span>
        </div>
     );
}
 
export default NavigationHeader;