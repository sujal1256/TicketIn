import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your actual API call to send OTP
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/forgot-password",
        { email }
      );
      
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Failed to send OTP:", error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center mb-6">
          Enter your email to receive a verification code
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/signin" className="text-purple-500 hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
