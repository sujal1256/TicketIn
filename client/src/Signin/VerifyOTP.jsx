import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/verify-otp",
        { otp, email }
      );
      console.log(response);
      
      setVerified(true);
      setMessage("OTP verified successfully");
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setVerified(false);
      setMessage("Invalid OTP, Try again");
      console.error("Failed to verify OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
        <p className="text-center mb-6">
          We've sent a verification code to{" "}
          <strong>{searchParams.get("email")}</strong>
        </p>

        {message && (
          <div
            className={`mb-4 p-3 ${verified ? "bg-green-100" : "bg-red-100"} ${
              verified ? "text-green-800" : "text-red-800"
            } rounded-md`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
