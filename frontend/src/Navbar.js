import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg   px-4">
      <Link className="navbar-brand fw-bold text-white" to="/">SaulDesign</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="nav">
        <ul className="navbar-nav  ">
          <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/about">About</Link></li>
           <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact</Link></li>
           <li className="nav-item"><Link className="nav-link text-white" to="/Signup">Signup</Link></li>
           <li className="nav-item"><Link className="nav-link text-white" to="/Login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
