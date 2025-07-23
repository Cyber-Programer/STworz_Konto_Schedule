import React, { useState, useTransition } from "react";
import logo from "../../assets/logo.svg";
import women from "../../assets/women.svg";
import ForgotPassword from "../../components/Auth/ForgotPass";
import VerifyCode from "../../components/Auth/VerifyCode";
const ForgotPass = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter ">
      {/* left content  */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col justify-center items-center">
        {/* logo section  */}
        <div>
          <div className=" absolute top-0 left-0 m-5">
            <img src={logo} alt="a animate picture" />
          </div>

          {/* import here other components of authentication */}
          {/* <ForgotPassword /> */}
          <VerifyCode />
        </div>
      </div>
      {/* right section  */}
      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img src={women} alt="A men image " className="hidden md:block" />
      </div>
    </div>
  );
};

export default ForgotPass;
