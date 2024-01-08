import { Link } from 'react-router-dom';
import ardvestLogo from '../assets/icons/logo.svg';
const AuthHeaders = ({position}) => {
    return (
        <div className={`${position} w-full border-b h-[10vh] md:h-[12vh] flex items-center px-3 md:px-8`}>
           <Link to={'/'}><img src={ardvestLogo} alt="" /></Link> 
        </div>
    );
}

export default AuthHeaders;