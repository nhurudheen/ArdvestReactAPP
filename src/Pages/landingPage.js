import AuthHeaders from "../Components/authHeader";
import insuredLogo from "../assets/icons/insured.svg";
import guaranteedLogo from "../assets/icons/guaranteed.svg";
import halalLogo from "../assets/icons/halal.svg";
import illustrationSvg from "../assets/images/landingillustration.svg";
import Buttons from "../Components/buttons";
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div className="relative">
            <AuthHeaders />
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen items-center px-5 md:px-8">
                <div className="h-full flex items-end md:items-center">
                    <div className="px-0 md:px-10">
                        <p className="font-semibold text-3xl mb-5 text-center md:text-left">Invest in what you eat!</p>
                        <div className="flex gap-8 justify-center md:justify-start">
                            <div className="flex gap-2 items-center">
                                <img src={insuredLogo} alt=""/>
                                    <span className="text-sm md:text-md">Insured</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img src={guaranteedLogo} alt=""/>
                                    <span className="text-sm md:text-md">Guaranteed</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img src={halalLogo} alt=""/>
                                    <span className="text-sm md:text-md">Halal</span>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 md:flex gap-6">
                            <Link to={'/createAccount'}><Buttons btnText={'Create Account'} btnType={'primary'}/></Link>
                            <Buttons btnText={'Login'} btnType={'secondary'}/>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={illustrationSvg} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;