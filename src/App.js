import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landingPage';
import CreateAccount from './Pages/user/auth/createAccount';
import UserLogin from './Pages/user/auth/login';
import VerifyEmail from './Pages/user/auth/verifyEmail';
import SignUpProfile from './Pages/user/auth/signUpProfile';
import CreatePin from './Pages/user/auth/createPin';
import ProfileComplete from './Pages/user/auth/profileComplete';
import ForgotPassword from './Pages/user/auth/forgotPassword';
import ResetPin from './Pages/user/auth/resetPasswordPin';
import ResetPassword from './Pages/user/auth/resetPassword';
import { ToastContainer } from 'react-toastify';
import UserLayout from './Pages/user/userLayout';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-right' theme='colored' newestOnTop={true} bodyClassName={() => 'toastBody flex items-center text-sm'} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/createAccount' element={<CreateAccount />} />
          <Route path='/auth' element={<UserLogin />} />
          <Route path='/verifyEmail' element={<VerifyEmail />} />
          <Route path='/signUpProfile' element={<SignUpProfile />} />
          <Route path='/setUpPin' element={<CreatePin />} />
          <Route path='/profileComplete' element={<ProfileComplete />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/verifyPasswordReset' element={<ResetPin />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='*' element={<UserLayout />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
