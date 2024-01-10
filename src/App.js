import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landingPage';
import CreateAccount from './Pages/user/auth/createAccount';
import UserLogin from './Pages/user/auth/login';
import VerifyEmail from './Pages/user/auth/verifyEmail';
import SignUpProfile from './Pages/user/auth/signUpProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/createAccount' element ={<CreateAccount/>}/>
          <Route path='/auth' element ={<UserLogin/>}/>
          <Route path='/verifyEmail/:emailAddress' element={<VerifyEmail/>}/>
          <Route path='/signUpProfile/:emailAddress' element={<SignUpProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
