import React, { use, useState, useTransition } from "react";
import notify from "../../utils/tost";
import UpdatePassword from "../../components/Auth/UpdatePassword";
import ForgotPassword from "../../components/Auth/ForgotPassword";
import VerifyCode from "../../components/Auth/VerifyCode";
import { useNavigate } from "react-router-dom";
import WebIcons from "../../assets/images";
const ForgotPass = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [opt, setOpt] = useState("");
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

  // OTP handle funtion
  const handleOTP = async () => {
    if (!opt) return notify.error("Enter the otp");
    console.log('first')
    setStep("reset");
  };

  // Reset Password Function
  const handleSetPassword = () => {
    if (!newPassword) return notify.error("Give new password");
    navigate("/login");
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
          <VerifyCode opt={opt} setOpt={setOpt} onSubmit={handleOTP} />
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
