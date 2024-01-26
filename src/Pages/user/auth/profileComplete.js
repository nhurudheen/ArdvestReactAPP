import { Link } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import successIcon from "../../../assets/images/success.png";
import Buttons from "../../../Components/buttons";
const ProfileComplete = () => {
    return (<div>
        <AuthHeaders />
        <div className="grid justify-center mt-20 md:mt-10">
            <img src={successIcon} alt="" className="w-3/4 justify-self-center"/>
                <p className="text-xl text-primary font-semibold text-center mt-4">...And thats it!</p>
                <p className="text-sm font-medium text-center mt-2">Start investing in what you eat.</p>
                <div className="mt-5">
                    <Link to={'/auth'}><Buttons btnText={'Go to Dashboard'} btnType={'primary'}/></Link>
                </div>
        </div>
    </div>);
}

export default ProfileComplete;