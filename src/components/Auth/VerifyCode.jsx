import React from "react";

const VerifyCode = () => {
  const email = "demo@gmail.com";
  return (
    <div className="mx-auto max-w-lg  font-Roboto">
      <h3 className="text-[1.75rem] md:text-[2rem] font-medium">
        Check your email
      </h3>
      <p className="text-gray-400">
        We sent a reset link to {email} enter 5 digit code that mentioned in the
        email
      </p>
      <div>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
      <button className="submit_btn bg-Primary text-white rounded-2xl w-full max-h-30">
        Verify code
      </button>
      <p className="text-gray-400 text-base">
        Haven’t got the email yet?
        <span className="text-Primary underline">Resend email</span>
      </p>
    </div>
  );
};

export default VerifyCode;
