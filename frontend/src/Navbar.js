import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <Link className="navbar-brand fw-bold text-white" to="/">SaulDesign</Link>

      <button
        className="navbar-toggler navbar-light bg-white shadow-sm"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
  <span className="navbar-toggler-icon"></span>
</button>

      <div className="collapse navbar-collapse justify-content-end " id="nav">
        <ul className="navbar-nav ">
          <li className="nav-item"><a href="/" className="nav-link text-white">Home</a> </li>
          <li className="nav-item"><a href="about" className="nav-link text-white">About</a> </li>
          <li className="nav-item"><a href="contact" className="nav-link text-white">Contact</a></li>
          <li className="nav-item"><a href="Login" className="nav-link text-white">Login</a></li>
          <li className="nav-item"><a href="/Signup" className="nav-link text-white">Signup</a>

 </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
