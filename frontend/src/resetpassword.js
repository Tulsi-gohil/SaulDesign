import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './App.css';
function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `https://sauldesign.onrender.com/api/auth/reset-password/${token}`,
        { password, confirmPassword }
      );
      setMessage(res.data.message || "Password reset successful ✅");

      setTimeout(() => navigate("/Login"), 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Forgot Password</h2>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label"> confirmPassword</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Verifying..." : "ResetPassword"}
          </button>
        </form>
      </div>
    </div>
    </div>
  )
};
 export default ResetPassword;