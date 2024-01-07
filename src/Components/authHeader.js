import ardvestLogo from '../assets/icons/logo.svg';
const AuthHeaders = () => {
    return (
        <div className="w-full border-b h-[10vh] md:h-[12vh] flex items-center px-3 md:px-8">
            <img src={ardvestLogo} alt="" />
        </div>
    );
}

export default AuthHeaders;