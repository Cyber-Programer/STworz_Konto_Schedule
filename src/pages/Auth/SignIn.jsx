import React, { useState, useTransition } from "react";
import logo from "../../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import mail from "../../assets/icons/auth/mail.svg";
import women from "../../assets/women.svg";
import { Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const loginHandel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter">
      {/* left content  */}
      <div className="w-full md:w-1/2">
        {/* logo section  */}
        <div className="m-5">
          <img src={logo} alt="a animate picture" />
        </div>
        {/* form section area  */}
        <div className="max-w-md  mx-auto mt-16 lg:mt-44 px-4 lg:px-0">
          <form onSubmit={handleSignIn}>
            <h1 className="font-medium text-[2rem] text-textClr text-center">
             {t("auth.login")}
            </h1>
            {/* email input  */}
            <div>
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.email")}{" "}
              </label>
              <div className="form-control">
                <input
                  type="email"
                  placeholder={t("auth.placeholder.email")}
                  className=" outline-none flex-1 text-gray-800"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img src={mail} alt="email-icon" />
              </div>
            </div>

            {/* password input  */}
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

            {/* submition button area  */}

            <button
              onClick={loginHandel}
              type="submit"
              className="submit_btn"
            >
              {t("auth.login")}
            </button>
            {/* sign up link  */}
            <div className="mt-4 text-center text-sm text-gray-600">
             {t("auth.dontHaveAccount")}{" "}
              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-Primary font-semibold hover:underline cursor-pointer"
              >
                {t("auth.signup")}
              </span>
            </div>
          </form>

          <h1 className="text-base text-center my-7">{t("auth.or")}</h1>

          <div className="sign_with_goole">
            <FcGoogle size={28} /> {t("auth.loginWithGoogle")}
          </div>
        </div>
      </div>
      {/* right section  */}
      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img src={women} alt="A men image " className="hidden md:block" />
      </div>
    </div>
  );
};

export default SignIn;
