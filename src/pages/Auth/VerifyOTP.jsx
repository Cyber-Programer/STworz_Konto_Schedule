// VerifyOTP.jsx - Updated version
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WebIcons from "../../assets/images";
import baseApi  from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";

const VerifyOTP = ({ email, onOtpVerified, onCancel }) => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();

  // Timer for resend functionality
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Auto-focus first input when component mounts
  useEffect(() => {
    // Small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      if (inputs.current[0]) {
        inputs.current[0].focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value) || value === "") {
      // validate the otp (only number or empty)
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Move to next input if value is entered and not the last input
      if (value && index < 5) {
        setTimeout(() => {
          inputs.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleKey = (e, index) => {
    if (e.key === "Backspace") {
      const newValues = [...values];

      if (values[index]) {
        // If current field has a value, clear it
        newValues[index] = "";
        setValues(newValues);
      } else if (index > 0) {
        // If empty, move focus left and clear previous value
        newValues[index - 1] = "";
        setValues(newValues);
        setTimeout(() => {
          inputs.current[index - 1]?.focus();
        }, 0);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < inputs.current.length - 1) {
      e.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (!paste) return;

    // Filter only digits and slice max 6 chars
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newValues = ["", "", "", "", "", ""];
    for (let i = 0; i < Math.min(digits.length, 6); i++) {
      newValues[i] = digits[i];
    }
    setValues(newValues);

    // Focus the next empty input or the last filled input
    const nextEmptyIndex = Math.min(digits.length, 5);
    setTimeout(() => {
      inputs.current[nextEmptyIndex]?.focus();
    }, 0);
  };

  const handleSubmit = async () => {
    const otp = values.join(""); // join the otp array in a single string

    if (otp.length < 6 || !values.every((e) => e.trim() !== "")) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    toast.loading("Verifying OTP...", { toastId: "loading-verify-otp" });

    try {
      const res = await baseApi.post(ENDPOINTS.VERIFY_OTP, {
        email,
        otp,
      });

      if (res.status === 200) {
        toast.dismiss("loading-verify-otp");
        toast.success("OTP Verified Successfully!");
        
        // Call the success callback
        if (onOtpVerified) {
          onOtpVerified();
        } else {
          // Fallback - redirect to signin
          navigate("/signin");
        }
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (err) {
      toast.dismiss("loading-verify-otp");
      
      const errorMessage = 
        err.response?.data?.msg || 
        err.response?.data?.detail || 
        "OTP verification failed. Please try again.";
        
      toast.error(errorMessage);
      console.error("OTP verification error:", err);
      
      // Clear OTP inputs on error
      setValues(["", "", "", "", "", ""]);
      setTimeout(() => {
        inputs.current[0]?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsLoading(true);
    toast.loading("Resending OTP...", { toastId: "loading-resend-otp" });

    try {
      const res = await baseApi.post(ENDPOINTS.RESEND_OTP, {
        email,
      });

      if (res.status === 200) {
        toast.dismiss("loading-resend-otp");
        toast.success("OTP resent successfully!");
        
        // Reset timer
        setResendTimer(60);
        setCanResend(false);
        
        // Clear current OTP
        setValues(["", "", "", "", "", ""]);
        setTimeout(() => {
          inputs.current[0]?.focus();
        }, 100);
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (err) {
      toast.dismiss("loading-resend-otp");
      
      const errorMessage = 
        err.response?.data?.msg || 
        err.response?.data?.detail || 
        "Failed to resend OTP. Please try again.";
        
      toast.error(errorMessage);
      console.error("Resend OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter">
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
        {/* logo section */}
        <div>
          <div
            onClick={() => navigate("/")}
            className="absolute top-0 left-0 m-5 cursor-pointer"
          >
            <img src={WebIcons.logo} alt="Logo" />
          </div>
        </div>

        {/* OTP Verification Section */}
        <div className="max-w-md mx-auto mt-16 lg:mt-14 px-4 lg:px-0">
          <h1 className="font-medium text-[2rem] text-textClr text-center">
            Verify OTP
          </h1>
          <p className="text-gray-400 text-center mb-2">
            We sent a 6-digit OTP to <strong>{email}</strong>. Please enter the OTP below.
          </p>
          <p className="text-sm text-gray-500 text-center mb-6">
            Check your email inbox and spam folder.
          </p>

          <div className="flex justify-between mt-5">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                maxLength={1}
                type="tel"
                inputMode="numeric"
                value={values[index]}
                disabled={isLoading}
                className={`p-2 rounded-lg border-2 text-center outline-none text-xl w-[3rem] h-[4rem] transition-colors duration-150 ${
                  values[index] ? "border-blue-500" : "border-gray-400"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                ref={(el) => (inputs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKey(e, index)}
                onPaste={handlePaste}
                autoComplete="off"
                data-index={index}
              />
            ))}
          </div>

          <button
            className={`submit_btn bg-Primary text-white rounded-2xl w-full max-h-30 mt-4 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isLoading || !values.every((e) => e.trim() !== "")}
            style={{
              cursor: values.every((e) => e.trim() !== "")
                ? "pointer"
                : "not-allowed",
            }}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-400 text-base">
              Haven't received the OTP?{" "}
              <span
                className={`underline cursor-pointer ${
                  canResend && !isLoading
                    ? "text-Primary hover:text-Primary/80"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleResendOtp}
              >
                {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
              </span>
            </p>
          </div>

          {/* Cancel/Back button */}
          <div className="text-center mt-4">
            <button
              className="text-gray-500 hover:text-gray-700 underline text-sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>

      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img
          src={WebIcons.authWomen}
          alt="Auth background"
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default VerifyOTP;