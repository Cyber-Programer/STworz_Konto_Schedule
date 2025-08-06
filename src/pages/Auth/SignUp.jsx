// SignUp.jsx - Updated version
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import mail from "../../assets/icons/auth/mail.svg";
import { Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WebIcons from "../../assets/images";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { toast } from "react-toastify";
import { addToken } from "../../utils/helper";
import VerifyOTP from "./VerifyOTP"; // Import your VerifyOTP component

const SignUp = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [registrationToken, setRegistrationToken] = useState(null);
  const navigate = useNavigate();
  const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;

  const registerHandel = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPass) {
      return toast.error("All input fields are required.");
    }

    if (password !== confirmPass) {
      return toast.error("Password must be same");
    }

    toast.loading("Creating account...", { toastId: "loading-register" });

    try {
      const res = await baseApi.post(ENDPOINTS.REGISTER, {
        email: email,
        name: name,
        password: password,
        password2: confirmPass,
      });
      
      const data = res.data;

      if (res.status === 201) {
        console.log("Registration successful:", data);
        
        // Store the token temporarily (don't add to storage yet)
        setRegistrationToken(data.token?.access);
        
        // Show OTP verification
        setShowOtpInput(true);
        toast.dismiss("loading-register");
        toast.success("Registration successful! Please verify your email with the OTP sent.");
      }
    } catch (error) {
      toast.dismiss("loading-register");
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        error.response?.data?.errors?.email?.[0] ||
        error.message;

      toast.error(`Registration Error: ${errorMessage}`);
      console.error("Register error:", error);
    }
  };

  // Handle successful OTP verification
  const handleOtpVerified = () => {
    try {
      // Only save token to localStorage after OTP verification
      if (registrationToken) {
        addToken(ACCESS_TOKEN_KEY, registrationToken);
      }
      
      // Reset state
      setShowOtpInput(false);
      setRegistrationToken(null);
      
      toast.success("Account verified successfully! Please sign in.");
      
      // Redirect to signin page
      navigate("/signin");
    } catch (error) {
      console.error("Error saving token:", error);
      toast.error("Something went wrong. Please try signing in.");
      navigate("/signin");
    }
  };

  // Handle OTP verification failure/cancel
  const handleOtpCancel = () => {
    setShowOtpInput(false);
    setRegistrationToken(null);
    // Stay on registration page for retry
  };

  // Show OTP verification component
  if (showOtpInput) {
    return (
      <VerifyOTP
        email={email}
        onOtpVerified={handleOtpVerified}
        onCancel={handleOtpCancel}
      />
    );
  }

  return (
    <div className="flex mx-auto min-h-screen font-Inter">
      {/* left content */}
      <div className="w-full md:w-1/2">
        {/* logo section */}
        <div className="m-5">
          <img src={WebIcons.logo} alt="logo" />
        </div>
        
        {/* form section area */}
        <div className="max-w-md mx-auto mt-16 lg:mt-14 px-4 lg:px-0">
          <form onSubmit={registerHandel}>
            <h1 className="font-medium text-[2rem] text-textClr text-center">
              {t("auth.registration")}
            </h1>

            {/* name input */}
            <div>
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.name")}
              </label>
              <div className="form-control">
                <input
                  type="text"
                  placeholder={t("auth.placeholder.name")}
                  className="outline-none flex-1 text-gray-800"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* email input */}
            <div className="mt-7">
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.email")}
              </label>
              <div className="form-control">
                <input
                  type="email"
                  placeholder={t("auth.placeholder.email")}
                  className="outline-none flex-1 text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img src={mail} alt="email-icon" />
              </div>
            </div>

            {/* password input */}
            <div className="my-9">
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.password")}
              </label>
              <div className="form-control">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-transparent outline-none flex-1 text-gray-800"
                  placeholder={t("auth.placeholder.password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* confirm password input */}
            <div className="my-9">
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.confirmPassword")}
              </label>
              <div className="form-control">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  className="bg-transparent outline-none flex-1 text-gray-800"
                  placeholder={t("auth.placeholder.confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit_btn">
              {t("auth.registration")}
            </button>
            
            {/* sign in link */}
            <div className="mt-4 text-center text-sm text-gray-600">
              {t("auth.doYouHaveAccount")}{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-Primary font-semibold hover:underline cursor-pointer"
              >
                {t("auth.signin")}
              </span>
            </div>
          </form>

          <h1 className="text-base text-center my-7">{t("auth.or")}</h1>

          <div className="sign_with_goole">
            <FcGoogle size={28} /> {t("auth.loginWithGoogle")}
          </div>
        </div>
      </div>
      
      {/* right section */}
      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img
          src={WebIcons.authWomen}
          alt="Auth illustration"
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default SignUp;