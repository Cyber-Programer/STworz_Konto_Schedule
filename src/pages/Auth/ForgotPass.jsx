import React, { useState } from "react";
import notify from "../../utils/tost";
import UpdatePassword from "../../components/Auth/UpdatePassword";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import VerifyCode from "../../components/Auth/VerifyCode";
import { useNavigate } from "react-router-dom";
import WebIcons from "../../assets/images";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { toast } from "react-toastify";

const ForgotPass = ({ initialStep, initialEmail, ckOtpVerify }) => {
  const [step, setStep] = useState(initialStep || "email");
  const [email, setEmail] = useState(initialEmail || "");
  const [Otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  // Send reset password email
  const handleSendEmail = async () => {
    if (!email) return notify.error("Give a valid email");
    try {
      const res = await baseApi.post(ENDPOINTS.FORGET_PASSWORD, { email });
      if (res.status === 200) {
        notify.success("OTP sent to your email");
        setStep("verify");
      } else {
        notify.error(res.data?.error || "Failed to send OTP");
      }
    } catch (err) {
      notify.error("Failed to send OTP");
      console.error(err);
    }
  };

  // Verify OTP and get reset token
  const handleOTP = async (otpValue) => {
    if (!otpValue) return toast.error("OTP not found");
    try {
      const res = await baseApi.post(ENDPOINTS.RESET_PASSWORD, {
        email,
        otp: otpValue,
      });
      if (res.status === 200 && res.data?.reset_token) {
        notify.success("OTP verified successfully");
        setResetToken(res.data.reset_token);
        setStep("reset");
      } else {
        notify.error(res.data?.error || "Invalid OTP");
      }
    } catch (err) {
      notify.error("OTP verification failed");
      console.error(err);
    }
  };

  // Set new password
  const handleSetPassword = async () => {
    
    // if (newPassword !== newPassword2)
    //   return notify.error("Passwords do not match");
    try {
      const res = await baseApi.post(ENDPOINTS.SET_NEW_PASSWORD, {
        reset_token: resetToken,
        new_password: newPassword,
        new_password2: newPassword2,
      });
      if (res.status === 200) {
        notify.success("Password reset successfully");
        navigate("/signin");
      } else {
        notify.error(res.data?.error || "Failed to reset password");
      }
    } catch (err) {
      notify.error("Password reset failed");
      console.error(err);
    }
  };

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter ">
      {/* left content  */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
        {/* logo section  */}
        <div>
          <div
            onClick={() => {
              navigate("/");
            }}
            className=" absolute top-0 left-0 m-5 cursor-pointer"
          >
            <img src={WebIcons.logo} alt="a animate picture" />
          </div>
        </div>

        {/* Functions */}
        {step === "email" && (
          <ForgotPassword
            email={email}
            setEmail={setEmail}
            onSubmit={handleSendEmail}
          />
        )}

        {step === "verify" && (
          <VerifyCode
            email={email}
            otp={Otp}
            setOtp={setOtp}
            onSubmit={handleOTP}
          />
        )}

        {step === "reset" && (
          <UpdatePassword
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newPassword2={newPassword2}
            setNewPassword2={setNewPassword2}
            onSubmit={handleSetPassword}
          />
        )}
      </div>
      {/* right section  */}
      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img
          src={WebIcons.authWomen}
          alt="A men image "
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default ForgotPass;
