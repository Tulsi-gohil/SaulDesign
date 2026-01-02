import { useState } from "react";
import axios from "axios";
 
function ForgetPassword() {
 
   const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://sauldesign.onrender.com/api/auth/",
        {  email }
      );

      setMessage(res.data.message || "User verified ✅");

      

    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-3">Forgot Password</h2>

        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Verifying..." : "ForgetPassword"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
