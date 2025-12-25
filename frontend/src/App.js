import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import VerifyEmail from './verifyEmail';

function App() {
return (
 <div>
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />}/>
      <Route path="/verifyEmail:token"element ={<VerifyEmail/>}/>
      <Route path='/Login' element={<Login />}/>
      </Routes> 
  </Router>
 </div>
  );
}

export default App;
