import React, { useState } from "react";
// import logo from "../../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import mail from "../../assets/icons/auth/mail.svg";
// import women from "../../assets/women.svg";
import { Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { data, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WebIcons from "../../assets/images";
import baseApi from "../../api/baseApi";
import { ENDPOINTS } from "../../api/endPoints";
import { toast } from "react-toastify";
import { addToken } from "../../utils/helper";
import ForgotPass from "./ForgotPass"; // forgetPassword page
const SignUp = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [Otp, setOtp] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY; // ACCESS_TOKEN_KEY NAME

  const registerHandel = async (e) => {
    e.preventDefault();

    // check all input's are given
    if (!name || !email || !password || !confirmPass)
      return toast.error("All input field's are required.");

    // check "password" and "confirmPassword" are same
    if (password !== confirmPass) return toast.error("Password must be same");

    try {
      const res = await baseApi.post(ENDPOINTS.REGISTER, {
        email: email,
        name: name,
        password: password,
        password2: confirmPass,
      });
      const data = res.data;

      // status: 201
      if (res.status === 201) {
        console.log(data);
        setShowOtpInput(true); // verify otp for new account

        try {
          addToken(ACCESS_TOKEN_KEY, data.token.access); // saving token to localstorage
        } catch (error) {
          const errorMessage =
            error.response?.data?.msg ||
            error.response?.data?.detail ||
            error.message;
          toast.error(`Registration Error: ${errorMessage}`);
          // console.log(error);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data.errors.email[0]) || // fallback for object-based errors
        error.message;

      toast.error(`Registration Error: ${errorMessage}`);
      // console.error("Register error:", error.response?.data || error.message);
      console.log(error);
    }
  };

  if (showOtpInput)
    return (
      <ForgotPass
        initialEmail={email}
        initialStep={"verify"}
        ckOtpVerify={true}
      />
    );

  return (
    <div className="flex  mx-auto min-h-screen font-Inter">
      {/* left content  */}
      <div className="w-full md:w-1/2">
        {/* logo section  */}
        <div className="m-5">
          <img src={WebIcons.logo} alt="a animate picture" />
        </div>
        {/* form section area  */}
        <div className="max-w-md  mx-auto mt-16 lg:mt-14 px-4 lg:px-0">
          <form onSubmit={registerHandel}>
            <h1 className="font-medium text-[2rem] text-textClr text-center">
              {t("auth.registration")}
            </h1>

            {/* name input  */}
            <div>
              <label className="block mb-1 font-Inter font-medium text-textClr">
                {t("auth.name")}{" "}
              </label>
              <div className="form-control">
                <input
                  type="text"
                  placeholder={t("auth.placeholder.name")}
                  className=" outline-none flex-1 text-gray-800"
                  onChange={(e) => setName(e.target.value)}
                />
                {/* <img src={mail} alt="email-icon" /> */}
              </div>
            </div>

            {/* email input  */}
            <div className="mt-7">
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

            {/* confirm password input  */}

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

            <button
              onClick={registerHandel}
              type="submit"
              className="submit_btn"
            >
              {t("auth.registration")}
            </button>
            {/* sign up link  */}
            <div className="mt-4 text-center text-sm text-gray-600">
              {t("auth.doYouHaveAccount")}{" "}
              <span
                onClick={() => {
                  navigate("/signin");
                }}
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

export default SignUp;
