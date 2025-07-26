import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";

const ForgotPassword = ({ setNewPassword, onSubmit }) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [confirmPass, setConfirmPass] = useState("");
  const handleSubmit = () => {
    setNewPassword(password);
    onSubmit(password);
  };
  return (
    <div>
      <div className="max-w-md  mx-auto px-4 lg:px-0">
        <h1 className="text-[1.75rem] md:text-[2rem] font-medium text-textClr ">
          {t("auth.setNewPass")}
        </h1>
        <p className="text-[1.25rem] text-[#999999] leading-5.5 mt-3">
          {t("auth.newPassDesc")}
        </p>
        <form className="mt-6">
          {/* password input  */}
          <div className="my-9">
            <label className="block mb-1 font-Inter font-medium text-textClr">
              {t("auth.newPassword")}
            </label>
            <div className="form-control">
              <input
                type={showPassword.new ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent outline-none flex-1 text-gray-800"
                placeholder={t("auth.placeholder.newPass")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    new: !prev.new,
                  }))
                }
                className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
              >
                {showPassword.new ? (
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
                type={showPassword.confirm ? "text" : "password"}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
                className="bg-transparent outline-none flex-1 text-gray-800"
                placeholder={t("auth.placeholder.reEnter")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
              >
                {showPassword.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button onClick={handleSubmit} type="button" className="submit_btn">
            {t("auth.updatePass")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
