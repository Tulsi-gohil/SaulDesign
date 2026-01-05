import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Home';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import OtpVerify from './otpverify';
import ForgetPassword from './forgetpassword';
import ResetPassword from './resetpassword';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword/:token" element={<ResetPassword />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
