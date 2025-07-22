import React from "react";
import logo from "../../assets/logo.svg";
import women from "../../assets/women.svg";

const ForgotPass = () => {
  const submitEmail = () => {
    console.log("/");
  };
  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter">
      {/* left content */}
      <div className="w-full md:w-1/2">
        <div className="m-5">
          <img src={logo} alt="a animate picture" />
        </div>
        {/* form section area  */}
        <div className="max-w-md  mx-auto mt-16 lg:mt-44 px-4 lg:px-0">
          <form onSubmit={submitEmail}>
            <h1>Forgot Password</h1>
          </form>
        </div>
      </div>

      {/* right content */}
      <div>
        <img src={women} alt="A men image " className="hidden md:block" />
      </div>
    </div>
  );
};

export default ForgotPass;
