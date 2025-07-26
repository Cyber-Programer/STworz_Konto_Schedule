import React, { use, useState, useTransition } from "react";
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
  const [showForgerPass, setShowForgerPass] = useState(true);
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const navigate = useNavigate();

  // Email Function
  const handleSendEmail = async () => {
    if (!email) return notify.error("Give an valid email");
    // const res = await fetch('')
    setStep("verify");
  };

  // const verifyOtp = async () => {
  //   try {
  //     const res = await baseApi.post(ENDPOINTS.VERIFY_OTP, {
  //       email,
  //       otp: Otp,
  //     });

  //     if (res.status === 200) {
  //       toast.success("OTP verified successfully");
  //       navigate("/dashboard");
  //     } else {
  //       toast.error("Invalid OTP");
  //     }
  //   } catch (err) {
  //     toast.error("OTP verification failed");
  //     console.error(err);
  //   }
  // };

  // OTP handle funtion
  const handleOTP = async (otpValue) => {
    if (!otpValue) return toast.error("OTP not found");

    try {
      const res = await baseApi.post(ENDPOINTS.VERIFY_OTP, {
        email,
        otp: otpValue,
      });

      if (res.status === 200) {
        notify.success("OTP verified successfully");

        if (ckOtpVerify) {
          navigate("/dashboard");
        } else {
          setStep("reset");
        }
      } else {
        notify.error("Invalid OTP");
      }
    } catch (err) {
      notify.error("OTP verification failed");
      console.error(err);
    }
  };

  // Reset Password Function
  const handleSetPassword = (updatedPassword) => {
    if (!updatedPassword) return;
    navigate("/signin");
  };

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter ">
      {/* left content  */}
      {console.log(initialEmail, initialStep)}
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
