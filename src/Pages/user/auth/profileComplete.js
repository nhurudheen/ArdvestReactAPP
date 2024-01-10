import { Link } from "react-router-dom";
import AuthHeaders from "../../../Components/authHeader";
import successIcon from "../../../assets/images/success.png";
import Buttons from "../../../Components/buttons";
const ProfileComplete = () => {
    return (<div>
        <AuthHeaders />
        <div class="grid justify-center mt-20 md:mt-10">
            <img src={successIcon} alt="" class="w-3/4 justify-self-center"/>
                <p class="text-xl text-primary font-semibold text-center mt-4">...And thats it!</p>
                <p class="text-sm font-medium text-center mt-2">Start investing in what you eat.</p>
                <div class="mt-5">
                    <Link to={'/auth'}><Buttons btnText={'Go to Dashboard'} btnType={'primary'}/></Link>
                </div>
        </div>
    </div>);
}

export default ProfileComplete;