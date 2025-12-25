import { useState } from "react";
import axios from "axios";

import "./App.css";
function Signup() {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/Signup",
        formData
      );

      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4"  style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-white mb-4">Signup</h2>
      {message && <p>{message}</p>}

        <form method="post" onSubmit={handleSubmit} >
          
          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label text-white">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control "
              placeholder="Enter Full Name"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label text-white">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label text-white">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={handleChange}
              required
            />
          </div>

           

          {/* Submit Button */}
          <button type="submit" className="btn btn-send w-100">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
