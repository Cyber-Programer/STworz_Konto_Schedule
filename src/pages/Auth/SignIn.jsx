import React, { useEffect, useState, useTransition } from "react";
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
import { addToken, getToken } from "../../utils/helper";
const SignIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY; // ACCESS_TOKEN_KEY NAME

  // Login Function
  const loginHandel = async (e) => {
    // navigate("/dashboard");
    e.preventDefault();
    try {
      if (!email || !password)
        return toast.error("Email and Password is required");
      const res = await baseApi.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const data = res.data;

      if (res.status === 200) {
        const token = data.token?.access;
        if (!token) return toast.error("Token not found...");
        toast.success(data?.msg);
        addToken(ACCESS_TOKEN_KEY, token);
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) || // fallback for object-based errors
        error.message;

      toast.error(`Registration Error: ${errorMessage}`);
      console.error("Register error:", error.response?.data || error.message);
    }
  };

  // Token verify function -> "if token available then automatic show the login page"
  const tokenVerify = async () => {
    const token = getToken(import.meta.env.VITE_ACCESS_TOKEN_KEY);
    if (token) {
      try {
        const res = await baseApi.post(ENDPOINTS.TOKEN_VERIFY, {
          token: token,
        });

        console.log(res.status);
        if (res.status === 200) {
          toast.success('Automatic Login Success!')
          navigate("/dashboard");
        } else {
          toast.info("Login with gmail and pass");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.msg ||
          error.response?.data?.detail ||
          JSON.stringify(error.response?.data) || // fallback for object-based errors
          error.message;

        toast.error(`Registration Error: ${errorMessage}`);
        console.error("Register error:", error.response?.data || error.message);
      }
    } else {
      toast.info("Login with gmail and password");
    }
  };

  useEffect(() => {
    tokenVerify();
  }, []);

  return (
    <div className="flex gap-6 mx-auto min-h-screen font-Inter">
      {/* left content  */}
      <div className="w-full md:w-1/2">
        {/* logo section  */}
        <div className="m-5">
          <img src={WebIcons.logo} alt="a animate picture" />
        </div>
        {/* form section area  */}
        <div className="max-w-md  mx-auto mt-16 lg:mt-44 px-4 lg:px-0">
          <form onSubmit={loginHandel}>
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
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => navigate("/forgotPassword")}
                  className="text-Primary text-sm hover:underline cursor-pointer"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>
            </div>

            {/* submition button area  */}

            <button
              onClick={loginHandel}
              type="submit"
              className="mt-2 cursor-pointer text-lg  font-bold font-Inter w-full bg-Primary hover:bg-Primary/90 text-white py-3 rounded-xl transition duration-300 "
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
        <img
          src={WebIcons.authWomen}
          alt="A men image "
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default SignIn;
