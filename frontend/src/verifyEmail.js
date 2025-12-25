import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/verify/${token}`)
      .then(() => setStatus("Email verified successfully 🎉"))
      .catch(() => setStatus("Invalid or expired link ❌"));
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>{status}</h2>
    </div>
  );
}

export default VerifyEmail;
